from flask import Flask, render_template
import requests
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', title='Home')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/events')
def events():
    return render_template('events.html')


if __name__ == '__main__':
    app.run(debug=True)
