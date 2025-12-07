#!/usr/bin/env python
"""
MASTER POPULATION SCRIPT
Consolidates all data from multiple population scripts and properly links media files.
Run with: python manage.py populate_all_data
"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.cms.models import (
    Page, PageSection, Banner, Activity, Faq, Testimonial,
    SocialLink, ContactInfo, PricingPlan, PartyPackage,
    GroupPackage, GuidelineCategory, LegalDocument,
    StatCard, InstagramReel, MenuSection, TimelineItem,
    ValueItem, FacilityItem, GalleryItem
)
from apps.core.models import GlobalSettings

def populate_pages():
    """Create all page records"""
    print("\n📄 Populating Pages...")
    pages_data = [
        {'slug': 'home', 'title': 'Ninja Inflatable Park - Home', 'description': 'Welcome to the ultimate inflatable park experience!'},
        {'slug': 'about', 'title': 'About Us - Ninja Inflatable Park', 'description': 'Learn about our story and mission.'},
        {'slug': 'pricing', 'title': 'Pricing - Ninja Inflatable Park', 'description': 'Check our session and party prices.'},
        {'slug': 'parties', 'title': 'Parties - Ninja Inflatable Park', 'description': 'Book the best birthday party ever!'},
        {'slug': 'attractions', 'title': 'Attractions - Ninja Inflatable Park', 'description': 'Explore our amazing inflatable attractions.'},
        {'slug': 'contact', 'title': 'Contact Us - Ninja Inflatable Park', 'description': 'Get in touch with us.'},
        {'slug': 'facilities', 'title': 'Facilities - Ninja Inflatable Park', 'description': 'Our park facilities and amenities.'},
        {'slug': 'groups', 'title': 'Group Bookings - Ninja Inflatable Park', 'description': 'Special rates for schools and large groups.'},
        {'slug': 'guidelines', 'title': 'Safety Guidelines - Ninja Inflatable Park', 'description': 'Important safety rules and guidelines.'},
        {'slug': 'privacy', 'title': 'Privacy Policy - Ninja Inflatable Park', 'description': 'Our privacy policy.'},
        {'slug': 'waiver-terms', 'title': 'Waiver Terms - Ninja Inflatable Park', 'description': 'Terms and conditions for waivers.'},
    ]
    
    for p in pages_data:
        Page.objects.update_or_create(
            slug=p['slug'],
            defaults={'title': p['title'], 'description': p['description'], 'active': True}
        )
    print(f"  ✅ Created/Updated {len(pages_data)} pages")

def populate_attractions():
    """Populate Activity model with proper media URLs"""
    print("\n🎯 Populating Attractions...")
    
    # Using actual uploaded images from media/uploads
    attractions_data = [
        {
            'name': 'Ninja Obstacle Course',
            'slug': 'ninja-obstacle-course',
            'short_description': 'Ultimate ninja warrior-style inflatable course',
            'description': 'Test your agility and strength on our ultimate ninja warrior-style inflatable course. Climb, jump, and conquer!',
            'image_url': 'http://localhost:8000/media/uploads/20251205_141324_d9eda80b_attraction1.jpeg',
            'active': True,
            'order': 1,
        },
        {
            'name': 'Giant Slides',
            'slug': 'giant-slides',
            'short_description': 'Massive inflatable slides with multiple lanes',
            'description': 'Experience the thrill of our massive inflatable slides. Race your friends down multiple lanes!',
            'image_url': 'http://localhost:8000/media/uploads/20251205_133456_2a794495_bigslide .jpeg',
            'active': True,
            'order': 2,
        },
        {
            'name': 'Wipe-Out Challenge',
            'slug': 'wipe-out-challenge',
            'short_description': 'Balance through spinning obstacles',
            'description': 'Can you stay balanced? Navigate the spinning obstacles without falling into the soft landing zone!',
            'image_url': 'http://localhost:8000/media/uploads/20251205_132226_c26b1787_attraction2.jpeg',
            'active': True,
            'order': 3,
        },
        {
            'name': 'Inflatable Maze',
            'slug': 'inflatable-maze',
            'short_description': 'Colorful maze with twists and turns',
            'description': 'Get lost in our colorful maze! Find your way through twists, turns, and surprise obstacles.',
            'image_url': 'http://localhost:8000/media/uploads/20251206_220639_ff0d1565_attraction3.jpeg',
            'active': True,
            'order': 4,
        },
        {
            'name': 'Giant Jumping Balls',
            'slug': 'giant-jumping-balls',
            'short_description': 'Oversized jumping balls for all ages',
            'description': 'Bounce to new heights on our oversized jumping balls. Perfect for all ages!',
            'image_url': 'http://localhost:8000/media/uploads/20251207_064945_56077e49_attraction4.jpeg',
            'active': True,
            'order': 5,
        },
        {
            'name': 'Dinosaur Guard',
            'slug': 'dinosaur-guard',
            'short_description': 'Prehistoric adventure zone',
            'description': 'Navigate past the inflatable dinosaurs in this prehistoric adventure zone!',
            'image_url': 'http://localhost:8000/media/uploads/20251205_133605_61d5c552_enterdino.jpeg',
            'active': True,
            'order': 6,
        },
        {
            'name': 'Balance Beam Challenge',
            'slug': 'balance-beam',
            'short_description': 'Test your balance skills',
            'description': "Test your balance skills on our inflatable beam. Don't fall off!",
            'image_url': 'http://localhost:8000/media/uploads/20251205_140842_0eb9e4d6_attraction6.jpeg',
            'active': True,
            'order': 7,
        },
        {
            'name': 'Wall Climbing',
            'slug': 'wall-climbing',
            'short_description': 'Scale the heights safely',
            'description': 'Scale the heights on our safe, inflatable climbing wall. Reach the summit!',
            'image_url': 'http://localhost:8000/media/uploads/20251205_205335_f8bbddf3_attraction7wallclimbing.jpeg',
            'active': True,
            'order': 8,
        },
        {
            'name': 'Spider Wall',
            'slug': 'spider-wall',
            'short_description': 'Stick and climb like a spider',
            'description': 'Stick to the wall like a spider! Jump and see how high you can climb.',
            'image_url': 'http://localhost:8000/media/uploads/20251206_212340_bc30558a_attraction9.jpeg',
            'active': True,
            'order': 9,
        },
        {
            'name': 'Adventure Park',
            'slug': 'adventure-park',
            'short_description': 'Complete adventure experience',
            'description': 'Explore our adventure-themed inflatable park with multiple zones and challenges to discover!',
            'image_url': 'http://localhost:8000/media/uploads/20251205_133517_20180238_attraction11.jpeg',
            'active': True,
            'order': 10,
        },
        {
            'name': 'Fun Games Zone',
            'slug': 'fun-games',
            'short_description': 'Interactive game activities',
            'description': 'Enjoy various interactive games and activities perfect for all ages!',
            'image_url': 'http://localhost:8000/media/uploads/20251206_010118_f201cdfb_67ceb56d5e61b3fdf0661353a1fafff6.jpg',
            'active': True,
            'order': 11,
        },
    ]
    
    created_count = 0
    for data in attractions_data:
        activity, created = Activity.objects.update_or_create(
            slug=data['slug'],
            defaults=data
        )
        if created:
            created_count += 1
            print(f"  ✓ Created: {activity.name}")
        else:
            print(f"  ↻ Updated: {activity.name}")
    
    print(f"  ✅ Total: {Activity.objects.count()} attractions")

def populate_gallery():
    """Populate gallery with uploaded images"""
    print("\n🖼️ Populating Gallery...")
    
    gallery_images = [
        {'title': 'Park Entrance', 'image_url': 'http://localhost:8000/media/uploads/20251205_130627_23a93ef2_entere.jpeg', 'category': 'Entrance', 'order': 1},
        {'title': 'Giant Slide Action', 'image_url': 'http://localhost:8000/media/uploads/20251205_133456_2a794495_bigslide .jpeg', 'category': 'Slides', 'order': 2},
        {'title': 'Obstacle Course', 'image_url': 'http://localhost:8000/media/uploads/20251205_141324_d9eda80b_attraction1.jpeg', 'category': 'Attractions', 'order': 3},
        {'title': 'Wipe Out Zone', 'image_url': 'http://localhost:8000/media/uploads/20251205_132226_c26b1787_attraction2.jpeg', 'category': 'Attractions', 'order': 4},
        {'title': 'Maze Adventure', 'image_url': 'http://localhost:8000/media/uploads/20251206_220639_ff0d1565_attraction3.jpeg', 'category': 'Attractions', 'order': 5},
        {'title': 'Dinosaur Zone', 'image_url': 'http://localhost:8000/media/uploads/20251205_133605_61d5c552_enterdino.jpeg', 'category': 'Attractions', 'order': 6},
        {'title': 'Wall Climbing', 'image_url': 'http://localhost:8000/media/uploads/20251205_205335_f8bbddf3_attraction7wallclimbing.jpeg', 'category': 'Attractions', 'order': 7},
        {'title': 'Fun Games', 'image_url': 'http://localhost:8000/media/uploads/20251206_212434_49af383f_game1.jpeg', 'category': 'Games', 'order': 8},
    ]
    
    for img in gallery_images:
        GalleryItem.objects.update_or_create(
            image_url=img['image_url'],
            defaults=img
        )
    print(f"  ✅ Created/Updated {len(gallery_images)} gallery items")

def populate_page_sections():
    """Populate all page sections"""
    print("\n📋 Populating Page Sections...")
    
    sections = [
        # Home Page
        {'page': 'home', 'section_key': 'hero', 'title': 'ARE YOU A NINJA?', 'content': 'Get ready to jump, climb, bounce, and conquer the ultimate inflatable adventure!', 'image_url': '/park-slides-action.jpg', 'order': 1},
        {'page': 'home', 'section_key': 'about', 'title': "India's Biggest Inflatable Park", 'content': "Ninja Inflatable Park was born from a simple idea: create a space where people of all ages can unleash their inner ninja, challenge themselves, and have an absolute blast doing it.", 'image_url': '/park-slides-action.jpg', 'order': 2},
        {'page': 'home', 'section_key': 'about_extended', 'content': "Spanning over 20,000 square feet, we've created India's largest inflatable adventure park with 11+ unique zones designed to thrill, challenge, and entertain.", 'order': 3},
        {'page': 'home', 'section_key': 'gallery', 'title': 'See The Action', 'content': "Real moments, real fun! Check out what awaits you at Ninja Inflatable Park.", 'order': 4},
        {'page': 'home', 'section_key': 'cta', 'title': 'Ready to BOUNCE?', 'content': 'Book your tickets now and experience the ultimate inflatable adventure!', 'order': 5},
        
        # About Page
        {'page': 'about', 'section_key': 'hero', 'title': "India's Biggest Inflatable Adventure Park", 'content': "Experience the thrill of jumping, sliding, and bouncing in a safe and fun environment.", 'order': 1},
        {'page': 'about', 'section_key': 'story', 'title': 'Our Story', 'content': """<p>Ninja Inflatable Park was born from a simple idea: create a space where people of all ages can unleash their inner ninja, challenge themselves, and have an absolute blast doing it.</p>
<p>Spanning over 20,000 square feet, we've created India's largest inflatable adventure park with 11+ unique zones designed to thrill, challenge, and entertain.</p>
<p>Whether you're looking for a fun family outing, an adrenaline-pumping workout, or the perfect venue for your next celebration, Ninja Park is your destination for unforgettable memories.</p>""", 'image_url': '/park-slides-action.jpg', 'order': 2},
        {'page': 'about', 'section_key': 'reviews', 'title': 'People Reviews on Ninja', 'content': 'Check out these amazing reviews from our visitors!', 'order': 3},
        {'page': 'about', 'section_key': 'cta', 'title': 'Join the Adventure!', 'content': "Experience the thrill of India's biggest inflatable park today!", 'order': 4},
        
        # Pricing Page
        {'page': 'pricing', 'section_key': 'hero', 'title': 'Pricing Plans', 'content': 'Choose the perfect package for your ninja adventure.', 'order': 1},
        {'page': 'pricing', 'section_key': 'group_booking', 'title': 'GROUP BOOKING', 'content': 'Custom Pricing for Groups 10+', 'order': 2},
        {'page': 'pricing', 'section_key': 'important_info', 'title': 'Important Info', 'content': """• Extra Hour: ₹500 per person
• Socks: Mandatory for all jumpers
• Waiver: Must be signed before entry
• Arrive Early: 15 mins before session""", 'order': 3},
    ]
    
    for s in sections:
        PageSection.objects.update_or_create(
            page=s['page'],
            section_key=s['section_key'],
            defaults={**s, 'active': True}
        )
    print(f"  ✅ Created/Updated {len(sections)} page sections")

def populate_stats():
    """Populate stat cards"""
    print("\n📊 Populating Stats...")
    
    stats = [
        # Home
        {"label": "Sq Ft of Fun", "value": "20,000+", "unit": "Sq Ft of Fun", "icon": "Zap", "page": "home", "order": 1},
        {"label": "Happy Jumpers", "value": "5,000+", "unit": "Happy Jumpers", "icon": "Users", "page": "home", "order": 2},
        {"label": "Attractions", "value": "11+", "unit": "Attractions", "icon": "Trophy", "page": "home", "order": 3},
        {"label": "Safe & Secure", "value": "100%", "unit": "Safe & Secure", "icon": "Shield", "page": "home", "order": 4},
        # About
        {"label": "Sq Ft of Fun", "value": "20,000+", "unit": "Sq Ft of Fun", "icon": "Zap", "page": "about", "order": 1},
        {"label": "Happy Ninjas", "value": "50,000+", "unit": "Happy Ninjas", "icon": "Users", "page": "about", "order": 2},
        {"label": "Unique Zones", "value": "11+", "unit": "Unique Zones", "icon": "Trophy", "page": "about", "order": 3},
        {"label": "Safety Record", "value": "100%", "unit": "Safety Record", "icon": "Shield", "page": "about", "order": 4},
    ]
    
    for stat in stats:
        StatCard.objects.update_or_create(
            page=stat['page'], label=stat['label'],
            defaults={**stat, 'active': True}
        )
    print(f"  ✅ Created/Updated {len(stats)} stat cards")

def populate_timeline():
    """Populate timeline items"""
    print("\n📅 Populating Timeline...")
    
    timeline = [
        {"year": "2020", "title": "The Dream Begins", "description": "Conceptualized India's biggest inflatable adventure park", "order": 1},
        {"year": "2021", "title": "Construction Starts", "description": "Began building our 20,000 sq ft facility with state-of-the-art equipment", "order": 2},
        {"year": "2022", "title": "Grand Opening", "description": "Opened doors to thousands of excited ninjas!", "order": 3},
        {"year": "2023", "title": "50K+ Happy Visitors", "description": "Celebrated serving over 50,000 happy customers", "order": 4},
        {"year": "2024", "title": "Expansion & Growth", "description": "Added new zones and became India's #1 inflatable park", "order": 5},
    ]
    
    for item in timeline:
        TimelineItem.objects.update_or_create(
            year=item['year'],
            defaults={**item, 'active': True}
        )
    print(f"  ✅ Created/Updated {len(timeline)} timeline items")

def populate_values():
    """Populate company values"""
    print("\n💎 Populating Values...")
    
    values = [
        {"title": "Fun First", "description": "Every decision we make is centered around creating maximum fun and joy for our guests.", "icon": "Users", "color": "secondary", "order": 1},
        {"title": "Safety Always", "description": "Your safety is our top priority. Trained staff, quality equipment, and strict protocols.", "icon": "Shield", "color": "primary", "order": 2},
        {"title": "Inclusive", "description": "Activities for all ages and abilities. Everyone deserves to feel like a ninja!", "icon": "Heart", "color": "accent", "order": 3},
        {"title": "Excellence", "description": "We strive for excellence in every aspect, from cleanliness to customer service.", "icon": "Award", "color": "secondary", "order": 4},
    ]
    
    for val in values:
        ValueItem.objects.update_or_create(
            title=val['title'],
            defaults={**val, 'active': True}
        )
    print(f"  ✅ Created/Updated {len(values)} values")

def populate_faqs():
    """Populate FAQs"""
    print("\n❓ Populating FAQs...")
    
    faqs = [
        {"question": "What age groups can enjoy Ninja Park?", "answer": "We have zones for everyone! From a dedicated toddler area to challenging courses for teens and adults. It's truly All Ages, All Fun.", "order": 1},
        {"question": "Do I need to book in advance?", "answer": "We highly recommend booking online to secure your slot, especially on weekends. Walk-ins are subject to availability.", "order": 2},
        {"question": "What should I wear?", "answer": "Comfortable athletic wear is best. Socks are MANDATORY for hygiene and safety. We sell grip socks at the counter if you need them.", "order": 3},
        {"question": "Is the park safe for children?", "answer": "Absolutely! We have a 100% safety record. Our equipment is top-tier, and trained marshals supervise all zones.", "order": 4},
        {"question": "Can I host a birthday party here?", "answer": "Yes! We specialize in unforgettable birthday bashes. Check out our Parties page for packages.", "order": 5},
    ]
    
    for faq in faqs:
        Faq.objects.update_or_create(
            question=faq['question'],
            defaults={**faq, 'active': True}
        )
    print(f"  ✅ Created/Updated {len(faqs)} FAQs")

def populate_facilities():
    """Populate facilities"""
    print("\n🏢 Populating Facilities...")
    
    facilities = [
        {"title": "Play Zones", "description": "Separate age-appropriate play areas including ninja obstacle courses, climbing walls, and giant slides.", "icon": "Users", "items": ["Ninja Course", "Toddler Zone", "Giant Slides", "Wipeout Challenge"], "order": 1},
        {"title": "Ninja Café", "description": "Refuel after your adventure with our selection of hot & cold drinks, meals, and snacks.", "icon": "Coffee", "items": ["Hot & Cold Drinks", "Fresh Snacks", "Meals", "Seating Area"], "order": 2},
        {"title": "Party Rooms", "description": "Private party rooms available for birthdays and special events with customizable packages.", "icon": "Utensils", "items": ["Private Space", "Decorations", "Hosting Staff", "Catering"], "order": 3},
        {"title": "Parking & Access", "description": "Convenient access for all visitors with ample parking space.", "icon": "Car", "items": ["Free Parking (2 Hrs)", "Accessible Entry", "Drop-off Zone"], "order": 4},
        {"title": "Health & Safety", "description": "Your safety is our priority with trained staff and first-aid facilities.", "icon": "Shield", "items": ["First Aid Staff", "CCTV Surveillance", "Hygiene Stations", "Daily Cleaning"], "order": 5},
        {"title": "Amenities", "description": "Everything you need for a comfortable visit.", "icon": "Wifi", "items": ["Free Wi-Fi", "Lockers", "Baby Care Room", "Merchandise Store"], "order": 6},
    ]
    
    for fac in facilities:
        FacilityItem.objects.update_or_create(
            title=fac['title'],
            defaults={**fac, 'active': True}
        )
    print(f"  ✅ Created/Updated {len(facilities)} facilities")

def populate_contact():
    """Populate contact information"""
    print("\n📞 Populating Contact Info...")
    
    contacts = [
        {"key": "main_phone", "label": "Call Us", "value": "+91 98454 71611", "category": "PHONE", "icon": "Phone", "order": 1},
        {"key": "main_email", "label": "Email Us", "value": "info@ninjapark.com", "category": "EMAIL", "icon": "Mail", "order": 2},
        {"key": "main_address", "label": "Visit Us", "value": "Ground Floor, Gopalan Innovation Mall, Bannerghatta Main Rd, JP Nagar 3rd Phase, Bengaluru, Karnataka 560076", "category": "ADDRESS", "icon": "MapPin", "order": 3},
        {"key": "hours_weekdays", "label": "Weekdays", "value": "12:00 PM - 9:00 PM", "category": "HOURS", "icon": "Clock", "order": 4},
        {"key": "hours_weekends", "label": "Weekends", "value": "10:00 AM - 11:00 PM", "category": "HOURS", "icon": "Clock", "order": 5},
        {"key": "extra_hour_price", "label": "Extra Hour", "value": "₹500 per person", "category": "OTHER", "icon": "Clock", "order": 6},
        {"key": "socks_requirement", "label": "Socks", "value": "Mandatory for all jumpers", "category": "OTHER", "icon": "AlertCircle", "order": 7},
        {"key": "waiver_requirement", "label": "Waiver", "value": "Must be signed before entry", "category": "OTHER", "icon": "FileText", "order": 8},
        {"key": "arrival_time", "label": "Arrive Early", "value": "15 mins before session", "category": "OTHER", "icon": "Clock", "order": 9},
    ]
    
    for contact in contacts:
        ContactInfo.objects.update_or_create(
            key=contact['key'],
            defaults={**contact, 'active': True}
        )
    print(f"  ✅ Created/Updated {len(contacts)} contact items")

def populate_pricing():
    """Populate pricing plans"""
    print("\n💰 Populating Pricing Plans...")
    
    plans = [
        {"name": "Party Packages", "type": "PARTY", "age_group": "Birthday & Events", "price": 1500.00, "duration": 120, "period_text": "/ Person", "description": "Perfect for birthdays and special events", "features": ["Min. 10 Participants", "Private Party Room", "Party Feast Included", "Dedicated Party Host", "2 Hours of Fun"], "variant": "accent", "order": 100},
    ]
    
    for plan in plans:
        PricingPlan.objects.update_or_create(
            name=plan['name'], type=plan['type'],
            defaults={**plan, 'active': True}
        )
    print(f"  ✅ Created/Updated {len(plans)} pricing plans")

def ensure_settings():
    """Ensure global settings exist"""
    print("\n⚙️ Checking Global Settings...")
    
    if GlobalSettings.objects.count() == 0:
        GlobalSettings.objects.create(
            park_name="Ninja Inflatable Park",
            contact_phone="+91 98454 71611",
            contact_email="info@ninjapark.com",
            address="Ground Floor, Gopalan Innovation Mall, Bannerghatta Main Rd, JP Nagar 3rd Phase, Bengaluru, Karnataka 560076",
            map_url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.750939864231!2d77.5986873750756!3d12.92372298738734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1580228d7a45%3A0x644e04369062342c!2sGopalan%20Innovation%20Mall!5e0!3m2!1sen!2sin!4v1709901234567!5m2!1sen!2sin",
            opening_hours={"weekdays": "12:00 PM - 9:00 PM", "weekends": "10:00 AM - 11:00 PM"},
            about_text="Ninja Inflatable Park is India's largest inflatable adventure park, offering a unique blend of fun, fitness, and thrill.",
            session_duration=60,
            adult_price=899.00,
            child_price=500.00,
            online_booking_enabled=True,
            party_bookings_enabled=True,
            maintenance_mode=False,
            waiver_required=True
        )
        print("  ✓ Created GlobalSettings")
    else:
        print("  ✓ GlobalSettings already exist")

def main():
    """Main execution"""
    print("=" * 70)
    print("🚀 MASTER DATA POPULATION SCRIPT")
    print("=" * 70)
    
    try:
        ensure_settings()
        populate_pages()
        populate_page_sections()
        populate_stats()
        populate_attractions()
        populate_gallery()
        populate_timeline()
        populate_values()
        populate_faqs()
        populate_facilities()
        populate_contact()
        populate_pricing()
        
        print("\n" + "=" * 70)
        print("✅ ALL DATA POPULATED SUCCESSFULLY!")
        print("=" * 70)
        print("\n📊 DATABASE SUMMARY:")
        print(f"  • Pages: {Page.objects.count()}")
        print(f"  • PageSections: {PageSection.objects.count()}")
        print(f"  • StatCards: {StatCard.objects.count()}")
        print(f"  • Activities: {Activity.objects.count()}")
        print(f"  • GalleryItems: {GalleryItem.objects.count()}")
        print(f"  • TimelineItems: {TimelineItem.objects.count()}")
        print(f"  • ValueItems: {ValueItem.objects.count()}")
        print(f"  • FAQs: {Faq.objects.count()}")
        print(f"  • Facilities: {FacilityItem.objects.count()}")
        print(f"  • ContactInfo: {ContactInfo.objects.count()}")
        print(f"  • PricingPlans: {PricingPlan.objects.count()}")
        print(f"  • GlobalSettings: {GlobalSettings.objects.count()}")
        
        print("\n🎯 NEXT STEPS:")
        print("  1. Visit Django Admin: http://localhost:8000/admin/")
        print("  2. Check all CMS models have data")
        print("  3. Test frontend pages")
        print("  4. All images are now linked from media/uploads")
        print()
        
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return 1
    
    return 0

if __name__ == '__main__':
    exit(main())
