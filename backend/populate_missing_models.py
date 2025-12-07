#!/usr/bin/env python
"""
Populate missing CMS models that are currently empty
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.cms.models import (
    PartyPackage, GroupPackage, GuidelineCategory, GroupBenefit
)

def populate_party_packages():
    """Populate party packages"""
    print("\n🎉 Populating Party Packages...")
    
    packages = [
        {
            "name": "Basic Party Package",
            "description": "Perfect for small celebrations with all the essentials",
            "price": 1200.00,
            "min_participants": 10,
            "max_participants": 15,
            "duration": 90,
            "includes": [
                "90 minutes of unlimited play",
                "Private party room for 30 minutes",
                "Party host assistance",
                "Plates, cups, and napkins",
                "Birthday child gets free entry"
            ],
            "addons": ["Extra 30 mins - ₹500", "Cake - ₹800", "Decorations - ₹1000"],
            "variant": "secondary",
            "order": 1
        },
        {
            "name": "Premium Party Package",
            "description": "The ultimate birthday experience with all the extras",
            "price": 1500.00,
            "min_participants": 10,
            "max_participants": 20,
            "duration": 120,
            "includes": [
                "2 hours of unlimited play",
                "Private party room for 1 hour",
                "Dedicated party host",
                "Party feast included",
                "Decorations included",
                "Plates, cups, napkins, and cutlery",
                "Birthday child gets free entry",
                "Complimentary return passes"
            ],
            "addons": ["Extra hour - ₹800", "Premium cake - ₹1200", "Photography - ₹2000"],
            "popular": True,
            "variant": "accent",
            "order": 2
        },
        {
            "name": "Mega Party Package",
            "description": "For the biggest celebrations - no limits!",
            "price": 2000.00,
            "min_participants": 15,
            "max_participants": 30,
            "duration": 150,
            "includes": [
                "2.5 hours of unlimited play",
                "Exclusive party room for 1.5 hours",
                "Two dedicated party hosts",
                "Premium party feast",
                "Full decorations setup",
                "All tableware and cutlery",
                "Birthday child + 1 friend free entry",
                "Goodie bags for all kids",
                "Professional photography",
                "Complimentary return passes"
            ],
            "addons": ["Extra hour - ₹1000", "DJ/Music - ₹3000", "Magic show - ₹5000"],
            "variant": "primary",
            "order": 3
        }
    ]
    
    for pkg in packages:
        PartyPackage.objects.update_or_create(
            name=pkg['name'],
            defaults={**pkg, 'active': True}
        )
    print(f"  ✅ Created/Updated {len(packages)} party packages")

def populate_group_packages():
    """Populate group packages"""
    print("\n👥 Populating Group Packages...")
    
    packages = [
        {
            "name": "School Field Trip",
            "subtitle": "Educational fun for students",
            "min_size": "15+ Students",
            "icon": "GraduationCap",
            "price": 400.00,
            "price_note": "per student",
            "features": [
                "Supervised play sessions",
                "Educational safety briefing",
                "Free teacher/chaperone entries (1:10 ratio)",
                "Flexible timing",
                "Group discount pricing"
            ],
            "color": "primary",
            "popular": True,
            "order": 1
        },
        {
            "name": "Corporate Team Building",
            "subtitle": "Boost team morale and bonding",
            "min_size": "10+ Employees",
            "icon": "Briefcase",
            "price": 600.00,
            "price_note": "per person",
            "features": [
                "Private session booking",
                "Team building activities",
                "Refreshments included",
                "Dedicated coordinator",
                "Customizable packages"
            ],
            "color": "secondary",
            "order": 2
        },
        {
            "name": "Community Groups",
            "subtitle": "Perfect for clubs and organizations",
            "min_size": "12+ Members",
            "icon": "Users",
            "price": 450.00,
            "price_note": "per person",
            "features": [
                "Group discount rates",
                "Flexible scheduling",
                "Private area available",
                "Organizer goes free (1:15 ratio)",
                "Extended play time options"
            ],
            "color": "accent",
            "order": 3
        }
    ]
    
    for pkg in packages:
        GroupPackage.objects.update_or_create(
            name=pkg['name'],
            defaults={**pkg, 'active': True}
        )
    print(f"  ✅ Created/Updated {len(packages)} group packages")

def populate_guidelines():
    """Populate safety guidelines"""
    print("\n🛡️ Populating Safety Guidelines...")
    
    categories = [
        {
            "title": "Before You Jump",
            "icon": "AlertCircle",
            "items": [
                "Remove all sharp objects (jewelry, watches, keys, etc.)",
                "Wear comfortable athletic clothing",
                "Grip socks are MANDATORY - available for purchase",
                "Complete waiver form before entry",
                "Listen carefully to safety briefing"
            ],
            "order": 1
        },
        {
            "title": "While Playing",
            "icon": "Activity",
            "items": [
                "Follow all marshal instructions",
                "One person on slides at a time",
                "No pushing, shoving, or rough play",
                "Stay in age-appropriate zones",
                "Take breaks when tired",
                "Stay hydrated"
            ],
            "order": 2
        },
        {
            "title": "Health & Safety",
            "icon": "Heart",
            "items": [
                "Not recommended if pregnant",
                "Inform staff of any medical conditions",
                "No food or drinks in play areas",
                "First aid available on-site",
                "Emergency exits clearly marked"
            ],
            "order": 3
        },
        {
            "title": "Age Restrictions",
            "icon": "Users",
            "items": [
                "Toddler zone: Ages 1-7 only",
                "Main zones: Ages 8 and above",
                "Adult supervision required for children under 12",
                "Height/weight restrictions apply to certain attractions",
                "Separate sessions for different age groups"
            ],
            "order": 4
        }
    ]
    
    for cat in categories:
        GuidelineCategory.objects.update_or_create(
            title=cat['title'],
            defaults={**cat, 'active': True}
        )
    print(f"  ✅ Created/Updated {len(categories)} guideline categories")

def populate_group_benefits():
    """Populate group booking benefits"""
    print("\n✨ Populating Group Benefits...")
    
    benefits = [
        {
            "title": "Discounted Rates",
            "description": "Special group pricing with significant savings for larger bookings",
            "icon": "DollarSign",
            "order": 1
        },
        {
            "title": "Flexible Scheduling",
            "description": "Choose your preferred date and time slot to fit your schedule",
            "icon": "Calendar",
            "order": 2
        },
        {
            "title": "Dedicated Support",
            "description": "Personal coordinator to help plan and execute your group event",
            "icon": "Headphones",
            "order": 3
        },
        {
            "title": "Private Sessions",
            "description": "Option to book exclusive sessions for your group only",
            "icon": "Lock",
            "order": 4
        }
    ]
    
    for benefit in benefits:
        GroupBenefit.objects.update_or_create(
            title=benefit['title'],
            defaults={**benefit, 'active': True}
        )
    print(f"  ✅ Created/Updated {len(benefits)} group benefits")

def main():
    print("=" * 70)
    print("🚀 POPULATING MISSING CMS MODELS")
    print("=" * 70)
    
    try:
        populate_party_packages()
        populate_group_packages()
        populate_guidelines()
        populate_group_benefits()
        
        print("\n" + "=" * 70)
        print("✅ ALL MISSING MODELS POPULATED!")
        print("=" * 70)
        print("\n📊 Summary:")
        print(f"  • PartyPackage: {PartyPackage.objects.count()} records")
        print(f"  • GroupPackage: {GroupPackage.objects.count()} records")
        print(f"  • GuidelineCategory: {GuidelineCategory.objects.count()} records")
        print(f"  • GroupBenefit: {GroupBenefit.objects.count()} records")
        print()
        
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return 1
    
    return 0

if __name__ == '__main__':
    exit(main())
