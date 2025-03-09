from flask import Flask, render_template, request, redirect, url_for
#added request, redirect, url_for to test submissions page
#add datetime import
from datetime import datetime

app = Flask(__name__)


submissions = []

@app.route('/')
def index():
    return render_template('index.html', title='Home')

@app.route('/events')
def events():
    return render_template('events.html')

@app.route('/profile')
def profiles():
    user = {
        'name': 'Emma Rodriguez',
        'email': 'emma-rodriguez@example.com',
        'location': 'Vancouver, BC, CA',
        'age': '27-30',
        'hobbies': 'Hiking, Photography, Reading',
        'event_type': 'Meetup'
    }
    
    
    friends = [
        {'name': 'Sarah Johnson', 'image': 'friend1.jpg'},
        {'name': 'Michael Smith', 'image': 'friend2.jpg'},
        {'name': 'Olivia Chen', 'image': 'friend3.jpg'},
        {'name': 'David Kim', 'image': 'friend4.jpg'},
        {'name': 'Jessica Patel', 'image': 'friend5.jpg'},
        {'name': 'Alex Washington', 'image': 'friend6.jpg'},
        {'name': 'Sophia Lee', 'image': 'friend7.jpg'},
        {'name': 'Aiden Nguyen', 'image': 'friend8.jpg'}
    ]
    
    # Example events data (optional - can be used if you want to pass real events)
    events = [
        {
            'date': 'May 12, 2025',
            'name': 'Vancouver Outdoor Photography Meetup',
            'location': 'Stanley Park',
            'type': 'Meetup'
        },
        {
            'date': 'Apr 3, 2025',
            'name': 'Hiking Club: Grouse Mountain',
            'location': 'North Vancouver',
            'type': 'Meetup'
        },
        {
            'date': 'Mar 18, 2025',
            'name': 'Book Club: Monthly Discussion',
            'location': 'Vancouver Public Library',
            'type': 'Workshop'
        },
        {
            'date': 'Feb 27, 2025',
            'name': 'Photography Workshop',
            'location': 'Emily Carr University',
            'type': 'Workshop'
        }
    ]
    
    return render_template('profile.html', user=user, friends=friends, events=events)

# The route below is for building a form
# added methods to test submissions page
@app.route('/form', methods=['GET', 'POST'])
def form():
    # start of form to submissions page
    if request.method == 'POST':
        submission = {
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'name': request.form['name'],
            'email': request.form['email'],
            'hobbies': request.form['hobbies'],
            'message': request.form['message'],
            'event_type': request.form['event_type'],
            'location': request.form['location']
        }
        submissions.append(submission)
        return redirect(url_for('submissions_page'))
    # end of form to submissions page
    return render_template('form.html')

@app.route('/submissions')
def submissions_page():
    return render_template('submissions.html', submissions=submissions)

if __name__ == '__main__':
    app.run(debug=True)
