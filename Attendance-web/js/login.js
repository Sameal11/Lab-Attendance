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

    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const regNo = document.getElementById("regno").value.trim(); // Using this as reg no
        const password = document.getElementById("loginPassword").value;

        console.log("Login attempt with regNo:", regNo);

        try {
            // Firestore path: /users/faculty/{regNo}
            const facultyRef = window.db.collection("users").doc("faculty").collection("faculty").doc(regNo);
            const facultySnap = await facultyRef.get();

            console.log("Firestore document exists:", facultySnap.exists);

            if (facultySnap.exists) {
                const facultyData = facultySnap.data();

                console.log("Faculty data retrieved:", facultyData);

                if (facultyData.password === password) {
                    console.log("Password match. Login successful.");
                    localStorage.setItem('role', 'faculty');
                    localStorage.setItem('regNo', regNo);
                    localStorage.setItem('loggedIn', 'true');// new 
                    window.location.href = "/pages/home.html";
                } else {
                    console.log("Incorrect password.");
                    alert("Incorrect password.");
                }
            } else {
                console.log("Faculty with this registration number not found.");
                alert("Faculty with this registration number not found.");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Login error: " + err.message);
        }
    });
});




