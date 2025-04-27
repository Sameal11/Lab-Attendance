window.addEventListener("dbInitialized", () => {
    document.addEventListener("DOMContentLoaded", () => {
      const form      = document.getElementById("attendanceForm");
      const tableBody = document.querySelector("#studentTable tbody");
  
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const date    = document.getElementById("attendanceDate").value;
        const section = document.getElementById("attendanceSection").value.trim();
        tableBody.innerHTML = "";
  
        if (!date || !section) {
          return alert("Please enter both date and section.");
        }
  
        try {
          // 1) fetch all students in this section
          const studentsSnap = await window.db
          .collection("users")
          .doc("Students")
          .collection("students")
          .where("Section", "==", section)
          .get();
  
          if (studentsSnap.empty) {
            tableBody.innerHTML = `
              <tr><td colspan="10" class="text-center">
                No students found for section “${section}.”
              </td></tr>`;
            return;
          }
  
          // 2) for each student fetch their attendance doc & activity_log
          await Promise.all(studentsSnap.docs.map(async (stuDoc) => {
            const regId = stuDoc.id;
            const s     = stuDoc.data();
  
            // get attendance record for this date
            const attDocRef = window.db
              .collection("users")
              .doc("Students")
              .collection("students")
              .doc(regId)
              .collection("attendance")
              .doc(date); 
  
            const attDoc = await attDocRef.get();
  
            // default values if no attendance record
            let inTime="—", outTime="—", duration="—", subject="—", rfidFlag="—", bluetoothFlag="—", computerFlag="—";
            if (attDoc.exists) {
              const a = attDoc.data();
              inTime       = a.in_time    || inTime;
              outTime      = a.out_time   || outTime;
              duration     = a.duration   || duration;
              subject      = a.subject    || subject;
              rfidFlag     = a.rfid       ? "✅" : "❌";
              bluetoothFlag= a.bluetooth  ? "✅" : "❌";
              computerFlag = a.computer   ? "✅" : "❌";
            }
  
            // fetch nested activity_log entries
            const actSnap = await attDocRef
              .collection("activity_log")
              .orderBy("time")
              .get();
  
            // build a small HTML list of activity entries
            let actHtml = "<ul class='mb-0'>";
            actSnap.forEach(ld => {
              const L = ld.data();
              actHtml += `<li>
                  ${L.time || ""} — App: ${L.active_application||""}, Idle: ${L.idle_time||""}
                </li>`;
            });
            actHtml += "</ul>";
  
            // 3) build the table row
            const row = document.createElement("tr");
            const makeCell = txt => {
              const td = document.createElement("td");
              td.innerHTML = txt;
              return td;
            };
  
            row.appendChild(makeCell(regId));
            row.appendChild(makeCell(s.name));
            row.appendChild(makeCell(rfidFlag));
            row.appendChild(makeCell(rfidFlag));
            row.appendChild(makeCell(computerFlag));
            row.appendChild(makeCell(inTime));
            row.appendChild(makeCell(outTime));
            row.appendChild(makeCell(duration));
            row.appendChild(makeCell(subject));
            row.appendChild(makeCell(actHtml));
  
            tableBody.appendChild(row);
          }));
        } catch (err) {
          console.error("Firestore error:", err);
          alert("Failed to load attendance. See console for details.");
        }
      });
    });
  });
  