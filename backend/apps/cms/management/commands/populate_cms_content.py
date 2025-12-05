from django.core.management.base import BaseCommand
from apps.cms.models import (
    PageSection, Activity, StatCard, TimelineItem, ValueItem, 
    Faq, ContactInfo, FacilityItem, GalleryItem, Testimonial, InstagramReel
)

class Command(BaseCommand):
    help = 'Populates CMS with initial content from frontend'

    def handle(self, *args, **kwargs):
        self.stdout.write('Populating CMS content...')
        
        # 1. Home Page Sections
        self.populate_home()
        
        # 2. Attractions
        self.populate_attractions()
        
        # 3. About Page
        self.populate_about()
        
        # 4. Contact Info
        self.populate_contact()
        
        self.stdout.write(self.style.SUCCESS('Successfully populated CMS content'))

    def populate_home(self):
        # Hero
        PageSection.objects.update_or_create(
            page='home', section_key='hero',
            defaults={
                'title': 'ARE YOU A NINJA?',
                'subtitle': 'Get ready to jump, climb, bounce, and conquer the ultimate inflatable adventure!',
                'image_url': '/park-slides-action.jpg',
                'active': True,
                'order': 0
            }
        )
        
        # About Section on Home
        PageSection.objects.update_or_create(
            page='home', section_key='about',
            defaults={
                'title': "India's Biggest Inflatable Park",
                'content': "Ninja Inflatable Park was born from a simple idea: create a space where people of all ages can unleash their inner ninja, challenge themselves, and have an absolute blast doing it.",
                'image_url': '/park-slides-action.jpg',
                'active': True,
                'order': 1
            }
        )

        # Stats
        stats = [
            {"label": "Sq Ft of Fun", "value": "20,000+", "unit": "", "icon": "Zap", "page": "home"},
            {"label": "Happy Jumpers", "value": "5,000+", "unit": "", "icon": "Users", "page": "home"},
            {"label": "Attractions", "value": "11+", "unit": "", "icon": "Trophy", "page": "home"},
            {"label": "Safe & Secure", "value": "100%", "unit": "", "icon": "Shield", "page": "home"},
        ]
        for i, stat in enumerate(stats):
            StatCard.objects.update_or_create(
                page=stat['page'], label=stat['label'],
                defaults={**stat, 'order': i}
            )

    def populate_attractions(self):
        activities = [
            {
                "name": "Ninja Warrior Course",
                "description": "Test your agility and strength on our epic ninja warrior obstacle course. Swing, climb, and conquer!",
                "image_url": "/images/uploads/img-1.jpg",
                "order": 1
            },
            {
                "name": "Giant Slides",
                "description": "Experience the thrill of our massive inflatable slides. Perfect for speed demons and adrenaline junkies!",
                "image_url": "/images/uploads/img-2.jpg",
                "order": 2
            },
            {
                "name": "Wipeout Zone",
                "description": "Navigate through spinning obstacles and bouncing challenges. Can you make it across without falling?",
                "image_url": "/images/uploads/img-3.jpg",
                "order": 3
            },
            {
                "name": "Bounce Arena",
                "description": "Jump, flip, and bounce to your heart's content in our massive bounce arena. Fun for all ages!",
                "image_url": "/images/uploads/img-4.jpg",
                "order": 4
            },
            {
                "name": "Obstacle Challenge",
                "description": "Race through tunnels, climb walls, and dodge obstacles in this action-packed challenge course!",
                "image_url": "/images/uploads/img-5.jpg",
                "order": 5
            },
            {
                "name": "Mega Slides",
                "description": "Our tallest and fastest slides for the ultimate sliding experience. Hold on tight!",
                "image_url": "/images/uploads/img-6.jpg",
                "order": 6
            },
            {
                "name": "Jump Zone",
                "description": "Dedicated jumping area with trampolines and soft landing zones. Perfect for practicing tricks!",
                "image_url": "/images/uploads/img-7.jpg",
                "order": 7
            },
            {
                "name": "Toddler Zone",
                "description": "Safe and fun area designed specifically for our youngest ninjas aged 1-7 years.",
                "image_url": "/images/uploads/img-8.jpg",
                "order": 8
            },
            {
                "name": "Climbing Walls",
                "description": "Scale our inflatable climbing walls and reach new heights! Multiple difficulty levels available.",
                "image_url": "/images/uploads/img-9.png",
                "order": 9
            },
            {
                "name": "Party Zones",
                "description": "Private party areas perfect for birthdays and celebrations. Make your special day unforgettable!",
                "image_url": "/images/uploads/img-10.jpg",
                "order": 10
            },
            {
                "name": "Adventure Park",
                "description": "Explore our adventure-themed inflatable park with multiple zones and challenges to discover!",
                "image_url": "/images/hero-background.jpg",
                "order": 11
            }
        ]
        
        for act in activities:
            Activity.objects.update_or_create(
                name=act['name'],
                defaults={
                    'description': act['description'],
                    'image_url': act['image_url'],
                    'order': act['order'],
                    'active': True
                }
            )

        # Facilities
        facilities = [
            {
                "title": "Play Zones",
                "description": "Separate age-appropriate play areas including ninja obstacle courses, climbing walls, and giant slides.",
                "icon": "Users",
                "items": ["Ninja Course", "Toddler Zone", "Giant Slides", "Wipeout Challenge"]
            },
            {
                "title": "Ninja Café",
                "description": "Refuel after your adventure with our selection of hot & cold drinks, meals, and snacks.",
                "icon": "Coffee",
                "items": ["Hot & Cold Drinks", "Fresh Snacks", "Meals", "Seating Area"]
            },
            {
                "title": "Party Rooms",
                "description": "Private party rooms available for birthdays and special events with customizable packages.",
                "icon": "Utensils",
                "items": ["Private Space", "Decorations", "Hosting Staff", "Catering"]
            },
            {
                "title": "Parking & Access",
                "description": "Convenient access for all visitors with ample parking space.",
                "icon": "Car",
                "items": ["Free Parking (2 Hrs)", "Accessible Entry", "Drop-off Zone"]
            },
            {
                "title": "Health & Safety",
                "description": "Your safety is our priority with trained staff and first-aid facilities.",
                "icon": "Shield",
                "items": ["First Aid Staff", "CCTV Surveillance", "Hygiene Stations", "Daily Cleaning"]
            },
            {
                "title": "Amenities",
                "description": "Everything you need for a comfortable visit.",
                "icon": "Wifi",
                "items": ["Free Wi-Fi", "Lockers", "Baby Care Room", "Merchandise Store"]
            }
        ]
        
        for i, fac in enumerate(facilities):
            FacilityItem.objects.update_or_create(
                title=fac['title'],
                defaults={
                    'description': fac['description'],
                    'icon': fac['icon'],
                    'items': fac['items'],
                    'order': i,
                    'active': True
                }
            )

    def populate_about(self):
        # About Page Hero
        PageSection.objects.update_or_create(
            page='about', section_key='hero',
            defaults={
                'title': "India's Biggest Inflatable Adventure Park",
                'subtitle': "Experience the thrill of jumping, sliding, and bouncing in a safe and fun environment.",
                'active': True
            }
        )
        
        # Our Story
        PageSection.objects.update_or_create(
            page='about', section_key='story',
            defaults={
                'title': "Our Story",
                'content': "Ninja Inflatable Park was born from a simple idea: create a space where people of all ages can unleash their inner ninja, challenge themselves, and have an absolute blast doing it.\n\nSpanning over 20,000 square feet, we've created India's largest inflatable adventure park with 11+ unique zones designed to thrill, challenge, and entertain.\n\nWhether you're looking for a fun family outing, an adrenaline-pumping workout, or the perfect venue for your next celebration, Ninja Park is your destination for unforgettable memories.",
                'image_url': '/park-slides-action.jpg',
                'active': True
            }
        )

        # Timeline
        timeline = [
            {"year": "2020", "title": "The Dream Begins", "desc": "Conceptualized India's biggest inflatable adventure park"},
            {"year": "2021", "title": "Construction Starts", "desc": "Began building our 20,000 sq ft facility with state-of-the-art equipment"},
            {"year": "2022", "title": "Grand Opening", "desc": "Opened doors to thousands of excited ninjas!"},
            {"year": "2023", "title": "50K+ Happy Visitors", "desc": "Celebrated serving over 50,000 happy customers"},
            {"year": "2024", "title": "Expansion & Growth", "desc": "Added new zones and became India's #1 inflatable park"},
        ]
        for i, item in enumerate(timeline):
            TimelineItem.objects.update_or_create(
                year=item['year'],
                defaults={
                    'title': item['title'],
                    'description': item['desc'],
                    'order': i,
                    'active': True
                }
            )

        # Values
        values = [
            {"title": "Fun First", "description": "Every decision we make is centered around creating maximum fun and joy for our guests.", "icon": "Users", "color": "secondary"},
            {"title": "Safety Always", "description": "Your safety is our top priority. Trained staff, quality equipment, and strict protocols.", "icon": "Shield", "color": "primary"},
            {"title": "Inclusive", "description": "Activities for all ages and abilities. Everyone deserves to feel like a ninja!", "icon": "Heart", "color": "accent"},
            {"title": "Excellence", "description": "We strive for excellence in every aspect, from cleanliness to customer service.", "icon": "Award", "color": "secondary"},
        ]
        for i, val in enumerate(values):
            ValueItem.objects.update_or_create(
                title=val['title'],
                defaults={
                    'description': val['description'],
                    'icon': val['icon'],
                    'color': val['color'],
                    'order': i,
                    'active': True
                }
            )

        # FAQs
        faqs = [
            {"q": "What age groups can enjoy Ninja Park?", "a": "We have zones for everyone! From a dedicated toddler area to challenging courses for teens and adults. It's truly All Ages, All Fun."},
            {"q": "Do I need to book in advance?", "a": "We highly recommend booking online to secure your slot, especially on weekends. Walk-ins are subject to availability."},
            {"q": "What should I wear?", "a": "Comfortable athletic wear is best. Socks are MANDATORY for hygiene and safety. We sell grip socks at the counter if you need them."},
            {"q": "Is the park safe for children?", "a": "Absolutely! We have a 100% safety record. Our equipment is top-tier, and trained marshals supervise all zones."},
            {"q": "Can I host a birthday party here?", "a": "Yes! We specialize in unforgettable birthday bashes. Check out our Parties page for packages."},
        ]
        for i, faq in enumerate(faqs):
            Faq.objects.update_or_create(
                question=faq['q'],
                defaults={
                    'answer': faq['a'],
                    'order': i,
                    'active': True
                }
            )

    def populate_contact(self):
        contacts = [
            {"key": "phone", "label": "Call Us", "value": "+91 98454 71611", "category": "PHONE", "icon": "Phone"},
            {"key": "email", "label": "Email Us", "value": "info@ninjapark.com", "category": "EMAIL", "icon": "Mail"},
            {"key": "address", "label": "Visit Us", "value": "Ninja Inflatable Park, Bangalore", "category": "ADDRESS", "icon": "MapPin"},
            {"key": "hours_week", "label": "Weekdays", "value": "12:00 PM - 9:00 PM", "category": "HOURS", "icon": "Clock"},
            {"key": "hours_mon", "label": "Monday", "value": "Closed", "category": "HOURS", "icon": "Clock"},
        ]
        for i, contact in enumerate(contacts):
            ContactInfo.objects.update_or_create(
                key=contact['key'],
                defaults={
                    'label': contact['label'],
                    'value': contact['value'],
                    'category': contact['category'],
                    'icon': contact['icon'],
                    'order': i,
                    'active': True
                }
            )
