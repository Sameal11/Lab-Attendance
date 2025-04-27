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
          studentsSnapshot.forEach((doc) => {
            const s = doc.data();
            const regId =doc.id;
            const li = document.createElement("li");
            // li.textContent = `${s.name} – ${s.regNo || ""}`;
            li.textContent = `${regId} – ${s.name} – ${s.email} `;
            studentList.appendChild(li);
          });
        }
      } catch (err) {
        console.error("Actual Firestore error:", err);
        alert("Failed to fetch student details. Please try again later.");
      }
    });
  });
});
