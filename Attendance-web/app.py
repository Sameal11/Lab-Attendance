from flask import Flask, render_template, session, jsonify

app = Flask(__name__, static_folder="static", template_folder="templates")

patients = [] 
@app.route('/')
def home():
    return render_template("index.html")

@app.route('/login')
def login_page():
    return render_template('login.html')  # your current page

@app.route('/attendance', methods=['POST'])
def attendance_page():
    # In real case, you'd verify username and password here
    return render_template('attendance.html')  # redirect after login

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/students')
def students():
    return render_template('students.html')

if __name__ == '__main__':
    app.run(debug=True)
