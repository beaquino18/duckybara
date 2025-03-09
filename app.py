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

@app.route('/activity')
def activity():
    # Get the selected category from the query parameter
    category = request.args.get('category', 'Social & Personal')
    
    # Define activities for each category
    activities = {
        'Social & Personal': [
            {
                'title': 'Urban Rec Dodgeball',
                'url': 'https://vancouver.urbanrec.ca/tournaments/dodgeball',
                'image': 'activity1.jpg',
                'description': 'Join the exciting dodgeball tournaments throughout Vancouver',
                'friends': ['Jennifer Park', 'Michael Smith', 'Olivia Lee']
            },
            {
                'title': 'UBC Thunderbirds',
                'url': 'https://gothunderbirds.ca/',
                'image': 'activity2.jpg',
                'description': 'Support UBC Thunderbirds sports teams and events',
                'friends': ['David Kim', 'Jessica Patel']
            },
            {
                'title': 'ESPN Wide World of Sports',
                'url': 'https://www.espnwwos.com/events/',
                'image': 'activity3.jpg',
                'description': 'Check out international sporting events',
                'friends': ['Yani Tiangco', 'Emily Wong', 'Aiden Nguyen']
            },
            {
                'title': 'Athletics Canada',
                'url': 'https://athletics.ca/events/',
                'image': 'activity4.jpg',
                'description': 'Find track and field events across Canada',
                'friends': ['Alex Washington']
            },
            {
                'title': 'Vancouver Sports Tickets',
                'url': 'https://seatgeek.com/cities/vancouver/sports',
                'image': 'activity5.jpg',
                'description': 'Get tickets to Vancouver sporting events',
                'friends': ['Daniel Garcia', 'Berndette Aquino']
            },
            {
                'title': 'CCAA Basketball',
                'url': 'https://www.ccaa.ca/sports/mbkb/championship/index',
                'image': 'activity6.jpg',
                'description': 'Follow Canadian collegiate basketball championships',
                'friends': ['Lucas Brown', 'Zoe Campbell', 'Noah Martinez']
            }
        ],
        'Technology & Innovation': [
            {
                'title': 'Reddit Hackathon',
                'url': 'https://hackreddit.devpost.com/',
                'image': 'tech1.jpg',
                'description': 'Build new features for Reddit in this online hackathon',
                'friends': ['Michael Smith', 'David Kim', 'Jessica Patel']
            },
            {
                'title': 'Agent Force Hackathon',
                'url': 'https://agentforcehackathon.devpost.com/',
                'image': 'tech2.jpg',
                'description': 'Create AI agents to solve real-world problems',
                'friends': ['Olivia Lee', 'Emily Wong']
            },
            {
                'title': 'Digital Jam',
                'url': 'https://digital-jam.devpost.com/',
                'image': 'tech3.jpg',
                'description': 'Create innovative digital experiences in this hackathon',
                'friends': ['Aiden Nguyen', 'Jennifer Park']
            },
            {
                'title': 'Ingenium STEM Winter Hacks',
                'url': 'https://ingeniumstem-winter-hacks-1-0.devpost.com/',
                'image': 'tech4.jpg',
                'description': 'Winter hackathon focusing on STEM innovations',
                'friends': ['Daniel Garcia', 'Lucas Brown']
            },
            {
                'title': 'CMD-F 2025',
                'url': 'https://cmd-f-2025.devpost.com/',
                'image': 'tech5.jpg',
                'description': 'Hackathon for women and non-binary individuals',
                'friends': ['Berndette Aquino', 'Jessica Patel', 'Jennifer Park']
            },
            {
                'title': 'Hack the Future 2025',
                'url': 'https://hack-the-future2025.devpost.com/',
                'image': 'tech6.jpg',
                'description': 'Create solutions for future challenges',
                'friends': ['Noah Martinez', 'Yani Tiangco']
            }
        ],
        'Food & Beverage': [
            {
                'title': 'Dine Out Vancouver',
                'url': 'https://www.dineoutvancouver.com/',
                'image': 'food1.jpg',
                'description': 'Vancouver\'s annual festival of food and drink',
                'friends': ['Jessica Patel', 'Emily Wong', 'Aiden Nguyen']
            },
            {
                'title': 'Vancouver Cocktail Week',
                'url': 'https://vancocktailweek.com/',
                'image': 'food2.jpg',
                'description': 'Celebration of cocktail culture in Vancouver',
                'friends': ['Michael Smith', 'Jennifer Park']
            },
            {
                'title': 'Greater Vancouver Food Truck Festival',
                'url': 'https://greatervanfoodtruckfest.com/events/',
                'image': 'food3.jpg',
                'description': 'Food truck festivals around Greater Vancouver',
                'friends': ['Olivia Lee', 'David Kim']
            },
            {
                'title': 'Jugal\'s Holi Pop-Up',
                'url': 'https://www.eventbrite.ca/e/jugals-holi-pop-up-a-taste-of-bengal-in-vancouver-tickets-1261570363919',
                'image': 'food4.jpg',
                'description': 'Bengali cuisine pop-up restaurant',
                'friends': ['Yani Tiangco', 'Berndette Aquino']
            },
            {
                'title': 'Vancouver Food Tours',
                'url': 'https://www.eventbrite.ca/e/a-culinary-adventure-in-vancouver-food-tours-by-cozymealtm-tickets-1128087793959',
                'image': 'food5.jpg',
                'description': 'Guided culinary tours around Vancouver',
                'friends': ['Lucas Brown', 'Zoe Campbell']
            },
            {
                'title': 'Fresh Ravioli Cooking Class',
                'url': 'https://www.eventbrite.ca/e/make-fresh-ravioli-with-chef-chris-cooking-class-by-classpoptm-tickets-1258771010979',
                'image': 'food6.jpg',
                'description': 'Learn to make fresh pasta with Chef Chris',
                'friends': ['Noah Martinez', 'Alex Washington', 'Daniel Garcia']
            }
        ],
        'Arts & Craft': [
            {
                'title': 'Cut-Outs Workshop',
                'url': 'https://www.eventbrite.ca/e/workshop-01-cut-outs-tickets-1274848589449',
                'image': 'art1.jpg',
                'description': 'Learn the art of paper cut-outs and collage',
                'friends': ['Jennifer Park', 'Jessica Patel']
            },
            {
                'title': 'Got Craft? Market',
                'url': 'https://gotcraft.com/',
                'image': 'art2.jpg',
                'description': 'Vancouver\'s largest indie craft market',
                'friends': ['Michael Smith', 'Emily Wong']
            },
            {
                'title': 'Vancouver Art Exhibition',
                'url': 'https://www.instagram.com/p/DG1JodXy4Qx/',
                'image': 'art3.jpg',
                'description': 'Contemporary art exhibition in downtown Vancouver',
                'friends': ['Olivia Lee', 'David Kim', 'Yani Tiangco']
            },
            {
                'title': 'Fiber Art & Fabric Jewelry',
                'url': 'https://www.eventbrite.ca/e/fiber-art-fabric-jewelry-tickets-1263536073409',
                'image': 'art4.jpg',
                'description': 'Workshop on creating unique fabric jewelry',
                'friends': ['Aiden Nguyen', 'Alex Washington']
            },
            {
                'title': 'Linocut Print Making',
                'url': 'https://www.eventbrite.ca/e/linocut-print-making-tickets-1250790641479',
                'image': 'art5.jpg',
                'description': 'Learn relief printing techniques',
                'friends': ['Daniel Garcia', 'Lucas Brown']
            },
            {
                'title': 'Lamp Mosaic Art Workshop',
                'url': 'https://www.eventbrite.ca/e/lamp-mosaic-art-workshop-a-cultural-creative-experience-tickets-1230816548429',
                'image': 'art6.jpg',
                'description': 'Create your own mosaic lamp in this cultural workshop',
                'friends': ['Berndette Aquino', 'Zoe Campbell', 'Noah Martinez']
            }
        ],
        'Community & Culture': [
            {
                'title': 'Vancouver Cherry Blossom Festival',
                'url': 'https://vcbf.ca/',
                'image': 'comm1.jpg',
                'description': 'Annual celebration of cherry blossoms in Vancouver',
                'friends': ['Jennifer Park', 'Michael Smith']
            },
            {
                'title': 'Vancouver Mural Festival',
                'url': 'https://vanmuralfest.ca/',
                'image': 'comm2.jpg',
                'description': 'Public art and murals throughout Vancouver',
                'friends': ['Olivia Lee', 'David Kim', 'Jessica Patel']
            },
            {
                'title': 'Vancouver Pride',
                'url': 'https://vancouverpride.ca/',
                'image': 'comm3.jpg',
                'description': 'LGBTQ2+ events celebrating diversity',
                'friends': ['Yani Tiangco', 'Emily Wong']
            },
            {
                'title': 'Indian Summer Festival',
                'url': 'https://indiansummerfest.ca/',
                'image': 'comm4.jpg',
                'description': 'Arts festival connecting Canada and South Asia',
                'friends': ['Aiden Nguyen', 'Alex Washington', 'Daniel Garcia']
            },
            {
                'title': 'Vancouver Farmers Markets',
                'url': 'https://eatlocal.org/',
                'image': 'comm5.jpg',
                'description': 'Weekly markets featuring local produce and crafts',
                'friends': ['Berndette Aquino', 'Lucas Brown']
            },
            {
                'title': 'Lunar New Year Festival',
                'url': 'https://lunarfest.org/',
                'image': 'comm6.jpg',
                'description': 'Celebration of Lunar New Year traditions',
                'friends': ['Zoe Campbell', 'Noah Martinez', 'Jennifer Park']
            }
        ],
        'Corporate & Business': [
            {
                'title': 'Indo-Pacific Insights',
                'url': 'https://www.eventbrite.ca/e/diversify-and-grow-indo-pacific-insights-for-canadian-startups-tickets-1249554303559',
                'image': 'corp1.jpg',
                'description': 'Insights for Canadian startups expanding to Indo-Pacific markets',
                'friends': ['Michael Smith', 'Jessica Patel']
            },
            {
                'title': 'Career and Innovation Expo',
                'url': 'https://www.eventbrite.ca/e/career-and-innovation-expo-tickets-1021276584757',
                'image': 'corp2.jpg',
                'description': 'Connect with employers and innovation leaders',
                'friends': ['Olivia Lee', 'David Kim', 'Yani Tiangco']
            },
            {
                'title': 'Burnaby Builder Showcase',
                'url': 'https://www.eventbrite.ca/e/multiplex-townhome-burnaby-builder-showcase-2025-tickets-1219012612539',
                'image': 'corp3.jpg',
                'description': 'Showcase of new residential developments in Burnaby',
                'friends': ['Emily Wong', 'Aiden Nguyen']
            },
            {
                'title': 'Emergenetics Workshop',
                'url': 'https://www.eventbrite.ca/e/emergenetics-meeting-of-the-minds-spring-2025-tickets-1205835990909',
                'image': 'corp4.jpg',
                'description': 'Personal and professional development workshop',
                'friends': ['Alex Washington', 'Daniel Garcia']
            },
            {
                'title': 'Vancouver Tech Summit',
                'url': 'https://www.vancouvereconomic.com/events',
                'image': 'corp5.jpg',
                'description': 'Leading tech conference in Western Canada',
                'friends': ['Berndette Aquino', 'Lucas Brown', 'Zoe Campbell']
            },
            {
                'title': 'Small Business Expo',
                'url': 'https://smallbusinessexpo.com/',
                'image': 'corp6.jpg',
                'description': 'Resources and networking for small business owners',
                'friends': ['Noah Martinez', 'Jennifer Park', 'Michael Smith']
            }
        ]
    }
    
    # Get activities for the selected category
    category_activities = activities.get(category, activities['Social & Personal'])
    
    return render_template('activity.html', 
                          category=category, 
                          activities=category_activities,
                          categories=list(activities.keys()))

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
        {'name': 'Jennifer Park', 'image': 'friend1.jpg'},
        {'name': 'Michael Smith', 'image': 'friend2.jpg'},
        {'name': 'Olivia Lee', 'image': 'friend3.jpg'},
        {'name': 'David Kim', 'image': 'friend4.jpg'},
        {'name': 'Jessica Patel', 'image': 'friend5.jpg'},
        {'name': 'Yani Tiangco', 'image': 'friend6.jpg'},
        {'name': 'Emily Wong', 'image': 'friend7.jpg'},
        {'name': 'Aiden Nguyen', 'image': 'friend8.jpg'},
        {'name': 'Alex Washington', 'image': 'friend9.jpg'},
        {'name': 'Daniel Garcia', 'image': 'friend10.jpg'},
        {'name': 'Berndette Aquino', 'image': 'friend11.jpg'},
        {'name': 'Lucas Brown', 'image': 'friend12.jpg'},
        {'name': 'Zoe Campbell', 'image': 'friend13.jpg'},
        {'name': 'Noah Martinez', 'image': 'friend14.jpg'}
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

@app.route('/socials')
def socials():
    user = {
        'name': 'Emma Rodriguez',
        'email': 'emma-rodriguez@example.com',
        'location': 'Vancouver, BC, CA'
    }
    return render_template('socials.html', user=user)

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
