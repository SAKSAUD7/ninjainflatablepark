#!/usr/bin/env python
"""
Comprehensive script to populate all CMS content in the Django database.
This script adds all hardcoded frontend content to the database without affecting the frontend.
"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.cms.models import (
    PageSection, StatCard, TimelineItem, ValueItem, InstagramReel,
    GalleryItem, ContactInfo, PricingPlan
)
from apps.core.models import GlobalSettings

def populate_page_sections():
    """Populate PageSection records for all pages"""
    print("📄 Populating PageSection records...")
    
    sections = [
        # Home Page Sections
        {
            'page': 'home',
            'section_key': 'hero',
            'title': "India's Biggest Inflatable Adventure Park",
            'content': "Experience the thrill of jumping, sliding, and bouncing in a safe and fun environment.",
            'image_url': '/images/hero-background.jpg',
            'order': 1,
            'active': True
        },
        {
            'page': 'home',
            'section_key': 'about',
            'title': "India's Biggest Inflatable Park",
            'content': "Ninja Inflatable Park was born from a simple idea: create a space where people of all ages can unleash their inner ninja, challenge themselves, and have an absolute blast doing it.",
            'image_url': '/park-slides-action.jpg',
            'order': 2,
            'active': True
        },
        {
            'page': 'home',
            'section_key': 'about_extended',
            'content': "Spanning over 20,000 square feet, we've created India's largest inflatable adventure park with 11+ unique zones designed to thrill, challenge, and entertain.",
            'order': 3,
            'active': True
        },
        {
            'page': 'home',
            'section_key': 'gallery',
            'title': 'See The Action',
            'content': "Real moments, real fun! Check out what awaits you at Ninja Inflatable Park.",
            'order': 4,
            'active': True
        },
        {
            'page': 'home',
            'section_key': 'cta',
            'title': 'Ready to BOUNCE?',
            'content': 'Book your tickets now and experience the ultimate inflatable adventure!',
            'order': 5,
            'active': True
        },
        
        # About Page Sections
        {
            'page': 'about',
            'section_key': 'hero',
            'title': "India's Biggest Inflatable Adventure Park",
            'content': "Experience the thrill of jumping, sliding, and bouncing in a safe and fun environment.",
            'order': 1,
            'active': True
        },
        {
            'page': 'about',
            'section_key': 'story',
            'title': 'Our Story',
            'content': """<p>Ninja Inflatable Park was born from a simple idea: create a space where people of all ages can unleash their inner ninja, challenge themselves, and have an absolute blast doing it.</p>
<p>Spanning over 20,000 square feet, we've created India's largest inflatable adventure park with 11+ unique zones designed to thrill, challenge, and entertain.</p>
<p>Whether you're looking for a fun family outing, an adrenaline-pumping workout, or the perfect venue for your next celebration, Ninja Park is your destination for unforgettable memories.</p>""",
            'image_url': '/park-slides-action.jpg',
            'order': 2,
            'active': True
        },
        {
            'page': 'about',
            'section_key': 'reviews',
            'title': 'People Reviews on Ninja',
            'content': 'Check out these amazing reviews from our visitors!',
            'order': 3,
            'active': True
        },
        {
            'page': 'about',
            'section_key': 'cta',
            'title': 'Join the Adventure!',
            'content': "Experience the thrill of India's biggest inflatable park today!",
            'order': 4,
            'active': True
        },
        
        # Pricing Page Sections
        {
            'page': 'pricing',
            'section_key': 'hero',
            'title': 'Pricing Plans',
            'content': 'Choose the perfect package for your ninja adventure.',
            'order': 1,
            'active': True
        },
        {
            'page': 'pricing',
            'section_key': 'group_booking',
            'title': 'GROUP BOOKING',
            'content': 'Custom Pricing for Groups 10+',
            'order': 2,
            'active': True
        },
        {
            'page': 'pricing',
            'section_key': 'important_info',
            'title': 'Important Info',
            'content': """• Extra Hour: ₹500 per person
• Socks: Mandatory for all jumpers
• Waiver: Must be signed before entry
• Arrive Early: 15 mins before session""",
            'order': 3,
            'active': True
        },
    ]
    
    created_count = 0
    for section_data in sections:
        section, created = PageSection.objects.get_or_create(
            page=section_data['page'],
            section_key=section_data['section_key'],
            defaults=section_data
        )
        if created:
            created_count += 1
            print(f"  ✓ Created: {section.page} - {section.section_key}")
        else:
            # Update existing
            for key, value in section_data.items():
                setattr(section, key, value)
            section.save()
            print(f"  ↻ Updated: {section.page} - {section.section_key}")
    
    print(f"✅ PageSection: {created_count} created, {len(sections) - created_count} updated\n")


def populate_stat_cards():
    """Populate StatCard records for home and about pages"""
    print("📊 Populating StatCard records...")
    
    stats = [
        # Home Page Stats
        {
            'label': 'Sq Ft of Fun',
            'value': '20,000+',
            'unit': 'Sq Ft of Fun',
            'icon': 'Zap',
            'color': 'primary',
            'page': 'home',
            'order': 1,
            'active': True
        },
        {
            'label': 'Happy Jumpers',
            'value': '5,000+',
            'unit': 'Happy Jumpers',
            'icon': 'Users',
            'color': 'secondary',
            'page': 'home',
            'order': 2,
            'active': True
        },
        {
            'label': 'Attractions',
            'value': '11+',
            'unit': 'Attractions',
            'icon': 'Trophy',
            'color': 'accent',
            'page': 'home',
            'order': 3,
            'active': True
        },
        {
            'label': 'Safe & Secure',
            'value': '100%',
            'unit': 'Safe & Secure',
            'icon': 'Shield',
            'color': 'primary',
            'page': 'home',
            'order': 4,
            'active': True
        },
        
        # About Page Stats
        {
            'label': 'Sq Ft of Fun',
            'value': '20,000+',
            'unit': 'Sq Ft of Fun',
            'icon': 'Zap',
            'color': 'primary',
            'page': 'about',
            'order': 1,
            'active': True
        },
        {
            'label': 'Happy Ninjas',
            'value': '50,000+',
            'unit': 'Happy Ninjas',
            'icon': 'Users',
            'color': 'secondary',
            'page': 'about',
            'order': 2,
            'active': True
        },
        {
            'label': 'Unique Zones',
            'value': '11+',
            'unit': 'Unique Zones',
            'icon': 'Trophy',
            'color': 'accent',
            'page': 'about',
            'order': 3,
            'active': True
        },
        {
            'label': 'Safety Record',
            'value': '100%',
            'unit': 'Safety Record',
            'icon': 'Shield',
            'color': 'primary',
            'page': 'about',
            'order': 4,
            'active': True
        },
    ]
    
    created_count = 0
    for stat_data in stats:
        stat, created = StatCard.objects.get_or_create(
            page=stat_data['page'],
            label=stat_data['label'],
            defaults=stat_data
        )
        if created:
            created_count += 1
            print(f"  ✓ Created: {stat.page} - {stat.label}")
        else:
            for key, value in stat_data.items():
                setattr(stat, key, value)
            stat.save()
            print(f"  ↻ Updated: {stat.page} - {stat.label}")
    
    print(f"✅ StatCard: {created_count} created, {len(stats) - created_count} updated\n")


def populate_timeline_items():
    """Populate TimelineItem records for About page"""
    print("📅 Populating TimelineItem records...")
    
    timeline_items = [
        {
            'year': '2020',
            'title': 'The Dream Begins',
            'description': "Conceptualized India's biggest inflatable adventure park",
            'order': 1,
            'active': True
        },
        {
            'year': '2021',
            'title': 'Construction Starts',
            'description': 'Began building our 20,000 sq ft facility with state-of-the-art equipment',
            'order': 2,
            'active': True
        },
        {
            'year': '2022',
            'title': 'Grand Opening',
            'description': 'Opened doors to thousands of excited ninjas!',
            'order': 3,
            'active': True
        },
        {
            'year': '2024',
            'title': 'Expansion & Growth',
            'description': "Added new zones and became India's #1 inflatable park",
            'order': 4,
            'active': True
        },
    ]
    
    created_count = 0
    for item_data in timeline_items:
        item, created = TimelineItem.objects.get_or_create(
            year=item_data['year'],
            title=item_data['title'],
            defaults=item_data
        )
        if created:
            created_count += 1
            print(f"  ✓ Created: {item.year} - {item.title}")
        else:
            for key, value in item_data.items():
                setattr(item, key, value)
            item.save()
            print(f"  ↻ Updated: {item.year} - {item.title}")
    
    print(f"✅ TimelineItem: {created_count} created, {len(timeline_items) - created_count} updated\n")


def populate_contact_info():
    """Populate ContactInfo records for pricing page"""
    print("📞 Populating ContactInfo records...")
    
    contact_items = [
        {
            'key': 'opening_hours',
            'label': 'Opening Hours',
            'value': '12:00 PM - 10:00 PM',
            'category': 'HOURS',
            'icon': 'Clock',
            'order': 1,
            'active': True
        },
        {
            'key': 'extra_hour_price',
            'label': 'Extra Hour',
            'value': '₹500 per person',
            'category': 'OTHER',
            'icon': 'Clock',
            'order': 2,
            'active': True
        },
        {
            'key': 'socks_requirement',
            'label': 'Socks',
            'value': 'Mandatory for all jumpers',
            'category': 'OTHER',
            'icon': 'AlertCircle',
            'order': 3,
            'active': True
        },
        {
            'key': 'waiver_requirement',
            'label': 'Waiver',
            'value': 'Must be signed before entry',
            'category': 'OTHER',
            'icon': 'FileText',
            'order': 4,
            'active': True
        },
        {
            'key': 'arrival_time',
            'label': 'Arrive Early',
            'value': '15 mins before session',
            'category': 'OTHER',
            'icon': 'Clock',
            'order': 5,
            'active': True
        },
    ]
    
    created_count = 0
    for item_data in contact_items:
        item, created = ContactInfo.objects.get_or_create(
            key=item_data['key'],
            defaults=item_data
        )
        if created:
            created_count += 1
            print(f"  ✓ Created: {item.key}")
        else:
            for key, value in item_data.items():
                setattr(item, key, value)
            item.save()
            print(f"  ↻ Updated: {item.key}")
    
    print(f"✅ ContactInfo: {created_count} created, {len(contact_items) - created_count} updated\n")


def populate_party_pricing():
    """Add party package to PricingPlan"""
    print("🎉 Populating Party Pricing Plan...")
    
    party_plan = {
        'name': 'Party Packages',
        'type': 'PARTY',
        'age_group': 'Birthday & Events',
        'price': 1500.00,
        'duration': 120,
        'period_text': '/ Person',
        'description': 'Perfect for birthdays and special events',
        'features': [
            'Min. 10 Participants',
            'Private Party Room',
            'Party Feast Included',
            'Dedicated Party Host',
            '2 Hours of Fun'
        ],
        'popular': False,
        'variant': 'accent',
        'active': True,
        'order': 100
    }
    
    plan, created = PricingPlan.objects.get_or_create(
        name='Party Packages',
        type='PARTY',
        defaults=party_plan
    )
    
    if created:
        print(f"  ✓ Created: Party Packages")
    else:
        for key, value in party_plan.items():
            setattr(plan, key, value)
        plan.save()
        print(f"  ↻ Updated: Party Packages")
    
    print(f"✅ Party Pricing Plan added\n")


def ensure_settings_exist():
    """Ensure at least one GlobalSettings record exists"""
    print("⚙️ Checking GlobalSettings...")
    
    if GlobalSettings.objects.count() == 0:
        settings = GlobalSettings.objects.create(
            park_name="Ninja Inflatable Park",
            contact_phone="+91 98454 71611",
            contact_email="info@ninjapark.com",
            address="Ground Floor, Gopalan Innovation Mall, Bannerghatta Main Rd, JP Nagar 3rd Phase, Bengaluru, Karnataka 560076",
            map_url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.750939864231!2d77.5986873750756!3d12.92372298738734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1580228d7a45%3A0x644e04369062342c!2sGopalan%20Innovation%20Mall!5e0!3m2!1sen!2sin!4v1709901234567!5m2!1sen!2sin",
            opening_hours={"weekdays": "11:00 AM - 10:00 PM", "weekends": "10:00 AM - 11:00 PM"},
            about_text="Ninja Inflatable Park is India's largest inflatable adventure park, offering a unique blend of fun, fitness, and thrill.",
            session_duration=60,
            adult_price=899.00,
            child_price=500.00,
            online_booking_enabled=True,
            party_bookings_enabled=True,
            maintenance_mode=False,
            waiver_required=True
        )
        print(f"  ✓ Created default GlobalSettings")
    else:
        print(f"  ✓ GlobalSettings already exist")
    
    print(f"✅ GlobalSettings verified\n")


def main():
    """Main execution function"""
    print("=" * 60)
    print("🚀 Starting Content Population Script")
    print("=" * 60)
    print()
    
    try:
        ensure_settings_exist()
        populate_page_sections()
        populate_stat_cards()
        populate_timeline_items()
        populate_contact_info()
        populate_party_pricing()
        
        print("=" * 60)
        print("✅ ALL CONTENT POPULATED SUCCESSFULLY!")
        print("=" * 60)
        print()
        print("📋 Summary:")
        print(f"  • PageSection: {PageSection.objects.count()} records")
        print(f"  • StatCard: {StatCard.objects.count()} records")
        print(f"  • TimelineItem: {TimelineItem.objects.count()} records")
        print(f"  • ContactInfo: {ContactInfo.objects.count()} records")
        print(f"  • PricingPlan: {PricingPlan.objects.count()} records")
        print(f"  • Settings: {GlobalSettings.objects.count()} records")
        print()
        print("🎯 Next Steps:")
        print("  1. Verify data in Django admin: http://localhost:8000/admin/")
        print("  2. Test frontend pages to ensure they display correctly")
        print("  3. Remove hardcoded fallbacks from frontend components")
        print()
        
    except Exception as e:
        print(f"❌ Error occurred: {str(e)}")
        import traceback
        traceback.print_exc()
        return 1
    
    return 0


if __name__ == '__main__':
    exit(main())
