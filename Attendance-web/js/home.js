

document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        if (typeof signOut === 'function' && auth) {
          signOut(auth).catch((err) => console.error("Firebase sign-out error:", err));
        }
        localStorage.clear();
        window.location.href = "/index.html"; // Adjust path as needed
      });
    }
  });


  document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".nav-link");
    const currentUrl = window.location.pathname;
  
    links.forEach(link => {
      if (link.getAttribute('href') === currentUrl) {
        link.classList.add('active');
      }
    });
  });
  