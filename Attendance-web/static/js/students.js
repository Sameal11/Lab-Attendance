document.addEventListener('DOMContentLoaded', function () {
    const attendanceTable = document.getElementById('attendanceTable');
    const searchInput = document.getElementById('searchInput');
    const totalStudents = document.getElementById('total-students');
    const studentsInside = document.getElementById('students-inside');
  
    let students = [];
  
    function populateTable(data) {
      attendanceTable.innerHTML = "";
      data.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${student.name}</td>
          <td>${student.rollNo}</td>
          <td>${student.section}</td>
          <td>${student.checkIn}</td>
          <td>${student.checkOut}</td>
          <td>${student.totalTime}</td>
        `;
        attendanceTable.appendChild(row);
      });
    }
  
    function updateStats() {
      totalStudents.textContent = students.length;
      const inside = students.filter(s => s.checkIn !== "--" && s.checkOut === "--").length;
      studentsInside.textContent = inside;
    }
  
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase();
      const filtered = students.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.rollNo.toLowerCase().includes(query)
      );
      populateTable(filtered);
    });
  
    // Fetch students from server
    fetch('/api/students')
      .then(res => res.json())
      .then(data => {
        students = data;
        populateTable(students);
        updateStats();
      })
      .catch(err => console.error('Failed to fetch students:', err));
  });
  