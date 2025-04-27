// /js/section.js

// Don’t run any Firestore code until we know window.db exists:
window.addEventListener("dbInitialized", () => {
  console.log("💧 dbInitialized fired — window.db is", window.db);

  document.addEventListener("DOMContentLoaded", () => {
    const sectionForm = document.getElementById("sectionForm");
    const studentList = document.getElementById("studentList");

    sectionForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const section = document.getElementById("section").value.trim();
      if (!section) return alert("Please enter a section.");

       studentList.innerHTML = "";
      

      try {
        const studentsSnapshot = await window.db
          .collection("users")
          .doc("Students")
          .collection("students")
          .where("Section", "==", section)
          .get();

        if (studentsSnapshot.empty) {
          studentList.innerHTML = "<li>No students found for this section.</li>";
        } else {
          const tableBody = document.querySelector('#studentTable tbody');

          studentsSnapshot.forEach((doc) => {
            const s     = doc.data();
            const regId = doc.id;

            // 2) create a table row
            const row = document.createElement('tr');

            // 3) create each cell
            const idCell    = document.createElement('td');
            const nameCell  = document.createElement('td');
            const emailCell = document.createElement('td');

            idCell.textContent    = `ID: ${regId}`;
            nameCell.textContent  = s.name;
            emailCell.textContent = s.email;

            // 4) append cells into the row
            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(emailCell);

            // 5) append the row into the tbody
            tableBody.appendChild(row);
          });

          //   studentsSnapshot.forEach((doc) => {
          //   const s = doc.data();
          //   const regId =doc.id;
          //   const row = document.createElement("li");
          // // // //   // li.textContent = `${s.name} – ${s.regNo || ""}`;
          //   row.textContent = `${regId} – ${s.name} – ${s.email} `;
          //   studentList.appendChild(row);
          //  });
        }
      } catch (err) {
        console.error("Actual Firestore error:", err);
        alert("Failed to fetch student details. Please try again later.");
      }
    });
  });
});
