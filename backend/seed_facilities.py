import os
import django
import sys

# Add backend directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.cms.models import FacilityItem

facilities_data = [
    {
        "title": "Play Zones",
        "description": "Separate age-appropriate play areas including ninja obstacle courses, climbing walls, and giant slides.",
        "icon": "Users",
        "image_url": "/images/uploads/img-1.jpg",
        "items": ["Ninja Course", "Toddler Zone", "Giant Slides", "Wipeout Challenge"],
        "order": 0
    },
    {
        "title": "Ninja Café",
        "description": "Refuel after your adventure with our selection of hot & cold drinks, meals, and snacks.",
        "icon": "Coffee",
        "image_url": "/images/uploads/img-2.jpg",
        "items": ["Hot & Cold Drinks", "Fresh Snacks", "Meals", "Seating Area"],
        "order": 1
    },
    {
        "title": "Party Rooms",
        "description": "Private party rooms available for birthdays and special events with customizable packages.",
        "icon": "Utensils",
        "image_url": "/images/uploads/img-3.jpg",
        "items": ["Private Space", "Decorations", "Hosting Staff", "Catering"],
        "order": 2
    },
    {
        "title": "Parking & Access",
        "description": "Convenient access for all visitors with ample parking space.",
        "icon": "Car",
        "image_url": "/images/uploads/img-4.jpg",
        "items": ["Free Parking (2 Hrs)", "Accessible Entry", "Drop-off Zone"],
        "order": 3
    },
    {
        "title": "Health & Safety",
        "description": "Your safety is our priority with trained staff and first-aid facilities.",
        "icon": "Shield",
        "image_url": "/images/uploads/img-5.jpg",
        "items": ["First Aid Staff", "CCTV Surveillance", "Hygiene Stations", "Daily Cleaning"],
        "order": 4
    },
    {
        "title": "Amenities",
        "description": "Everything you need for a comfortable visit.",
        "icon": "Wifi",
        "image_url": "/images/uploads/img-6.jpg",
        "items": ["Free Wi-Fi", "Lockers", "Baby Care Room", "Merchandise Store"],
        "order": 5
    }
]

for data in facilities_data:
    item, created = FacilityItem.objects.get_or_create(
        title=data['title'],
        defaults=data
    )
    if not created:
        # Update existing items to ensure they have images and correct data
        item.description = data['description']
        item.icon = data['icon']
        if not item.image_url:
            item.image_url = data['image_url']
        item.items = data['items']
        item.order = data['order']
        item.save()
    print(f"{'Created' if created else 'Updated'} facility: {item.title}")
