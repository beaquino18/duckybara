from flask import Flask, render_template, request, redirect, url_for
#added request, redirect, url_for to test submissions page

#add datetime import
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', title='Home')

@app.route('/events')
def events():
    return render_template('events.html')

@app.route('/profile')
def profiles():
    user = {
        'name': 'John Doe',
        'email': 'john@example.com',
        'location': 'New York, NY',
        'age': '27-30',
        'hobbies': 'Hiking, Photography, Reading',
        'event_type': 'Meetup'
    }
    
    # Example friends data - replace with actual friends data
    friends = [
        {'name': 'Sarah Johnson', 'image': 'friend1.jpg'},
        {'name': 'Michael Smith', 'image': 'friend2.jpg'},
        # More friends...
    ]
    
    return render_template('profile.html', user=user, friends=friends)

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

    # below is the logic for the hobbies field where comma separated values are read individually
    event_type = request.form['event_type']
    hobbies = request.form['hobbies'].split(',')
    # Save the data (for simplicity, we'll just print it here)
    print(f"Event Type: {event_type}, Hobbies: {hobbies}")
    return 'Form submitted successfully'

    #test
    

if __name__ == '__main__':
    app.run(debug=True)
