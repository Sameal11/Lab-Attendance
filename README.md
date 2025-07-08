# 🧠 Lab Attendance and Activity Monitoring System

A full-stack Python-based system that automates lab attendance and monitors student computer activity in real time. The system includes a startup-triggered desktop application for student login and background tracking, along with a faculty-facing web portal to manage attendance records and monitor usage.

## 🚀 Features

### 🖥️ Desktop Client (Python)
- Launches automatically on system startup
- Prompts students to enter encrypted credentials (Student ID + Password)
- Validates login via Firebase Authentication
- Initiates a session on successful login
- Tracks:
  - Active applications and their usage time
  - System idle durations
  - Session start and end times
- Stores activity logs in Firebase Firestore under student attendance record

### 🌐 Faculty Web Portal (HTML/CSS/JavaScript)
- Login-protected interface for faculty members
- View attendance logs for each student
- Filter records by date, student ID, or lab system
- Displays session details and application usage summaries
- Export or print attendance reports

## 🛠️ Tech Stack

### Desktop Client:
- Python
- Firebase Authentication & Firestore
- Libraries: `psutil`, `cryptography`, `tkinter`, `schedule`

### Web Portal:
- HTML, CSS, JavaScript
- Firebase (Realtime Database / Firestore)

## 🔐 Security
- Passwords are encrypted before transmission and securely verified
- Session management using secure tokens or local state tracking
- Firebase security rules restrict unauthorized data access

## 📦 Installation & Setup

### Desktop Client (Python):
1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/lab-attendance-system.git
   cd lab-attendance-system/desktop-client
