from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', title='Home')

# The route below is for building a form
@app.route('/form',  methods=['POST'])
def form():
    return render_template('form.html')
    """
    # below is the logic for the hobbies field where comma separated values are read individually
    event_type = request.form['event_type']
    hobbies = request.form['hobbies'].split(',')
    # Save the data (for simplicity, we'll just print it here)
    print(f"Event Type: {event_type}, Hobbies: {hobbies}")
    return 'Form submitted successfully'
    """
    

if __name__ == '__main__':
    app.run(debug=True)


