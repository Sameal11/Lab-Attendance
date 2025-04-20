document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    const registerDoctorBtn = document.querySelector(".register-doctor");
    const registerPatientBtn = document.querySelector(".register-patient");

    // Show registration form
    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

   

    // Show login form
    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });
});