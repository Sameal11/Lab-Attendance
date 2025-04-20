document.addEventListener('DOMContentLoaded', function () {
  
    const homeNav = document.getElementById('homeNav');
    const studentsNav = document.getElementById('studentsNav');
    const logoutNav = document.getElementById('logoutNav');
    const startBluetooth = document.getElementById('startBluetooth');
  
    const pages = document.querySelectorAll('.page');
  
    function showPage(pageClass) {
      pages.forEach(page => page.style.display = 'none');
      document.querySelector(`.${pageClass}`).style.display = 'block';
    }
  
    homeNav.addEventListener('click', function (e) {
      e.preventDefault();
      showPage('home-page');
    });
  
    studentsNav.addEventListener('click', function (e) {
      e.preventDefault();
      showPage('students-page');
    });
  
    logoutNav.addEventListener('click', function (e) {
      e.preventDefault();
      showPage('logout-page');
  
      // Optional: clear session or localStorage
      // localStorage.clear();
      // sessionStorage.clear();
  
      // Optional: send logout request to server
      /*
      fetch('/logout', { method: 'POST' })
        .then(res => console.log('Logged out successfully'))
        .catch(err => console.error(err));
      */
    });
  
    
  
  });
  