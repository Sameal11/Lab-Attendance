import time
import psutil
import pygetwindow as gw
import pyautogui
import firebase_admin
from firebase_admin import credentials, db

# Firebase Setup
cred = credentials.Certificate("firebase_credentials.json")  # Replace with your JSON key
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://studaa-1d2d1-default-rtdb.firebaseio.com/'  # Replace with your Firebase URL
})

# Function to get active application
def get_active_application():
    try:
        window = gw.getActiveWindow()
        return window.title if window else "Unknown"
    except Exception:
        return "Unknown"

# Function to detect idle time
def get_idle_time():
    return pyautogui.position()  # Get cursor position

# Function to send logs to Firebase
def log_activity(student_id, active_app, idle_time):
    ref = db.reference(f"students/{student_id}/activity_logs")
    log = {
        "timestamp": time.time(),
        "active_application": active_app,
        "idle_time": idle_time
    }
    ref.push(log)

# Main Loop
previous_position = get_idle_time()
idle_time = 0

while True:
    active_app = get_active_application()
    current_position = get_idle_time()
    
    # If mouse position remains the same, increase idle time
    if current_position == previous_position:
        idle_time += 1
    else:
        idle_time = 0  # Reset idle time if the user is active

    previous_position = current_position
    
    print(f"Active App: {active_app}, Idle Time: {idle_time} sec")
    
    # Log the activity
    log_activity("student_123", active_app, idle_time)  # Replace with actual student ID

    time.sleep(5)  # Logs every 5 seconds
