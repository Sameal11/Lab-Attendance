import mysql.connector 

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="sneha@12",  # Change to your MySQL password
        database="attendance_db"
    )

