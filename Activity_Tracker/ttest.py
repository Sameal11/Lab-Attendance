import time
import firebase_admin
from firebase_admin import credentials, firestore
import pygetwindow as gw
import pyautogui
import tkinter as tk
from tkinter import simpledialog, messagebox

# Initialize Firebase
cred = credentials.Certificate('firebase_credentials.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Functions
def get_active_application():
    try:
        window = gw.getActiveWindow()
        return window.title if window else "Unknown"
    except Exception:
        return "Unknown"

def get_mouse_position():
    return pyautogui.position()

def login_student():
    root = tk.Tk()
    root.withdraw()
    reg_id = simpledialog.askstring("Login", "Enter your Registration ID (e.g., RA23U2M4040):")
    if not reg_id:
        messagebox.showerror("Error", "Registration ID is required.")
        exit()

    student_ref = db.collection('users').document('Students').collection('students').document(reg_id)
    student_doc = student_ref.get()

    if not student_doc.exists:
        messagebox.showerror("Error", "Student not found in database.")
        exit()

    messagebox.showinfo("Success", f"Welcome {student_doc.to_dict().get('name', 'Student')}!")
    return reg_id

def mark_attendance(reg_id):
    today = time.strftime("%Y-%m-%d")
    attendance_ref = db.collection('users').document('Students').collection('students').document(reg_id).collection('attendance').document(today)

    attendance_ref.set({
        "date": today,
        "in_time": firestore.SERVER_TIMESTAMP,
        "subject": "Not Specified"
    }, merge=True)

    return attendance_ref

def log_activity(attendance_ref, active_app, idle_time):
    activity_logs_ref = attendance_ref.collection('activity_logs')
    activity_logs_ref.add({
        "start_time":firestore.SERVER_TIMESTAMP,
        "active_application": active_app,
        "idle_time": idle_time
    })

# Main
reg_id = login_student()
attendance_ref = mark_attendance(reg_id)

previous_position = get_mouse_position()
idle_seconds = 0

while True:
    active_app = get_active_application()
    current_position = get_mouse_position()

    if current_position == previous_position:
        idle_seconds += 1
    else:
        idle_seconds = 0

    previous_position = current_position

    print(f"[{reg_id}] Active App: {active_app}, Idle Time: {idle_seconds} sec")
    log_activity(attendance_ref, active_app, idle_seconds)

    time.sleep(5)
