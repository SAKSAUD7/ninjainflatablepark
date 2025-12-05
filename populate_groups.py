import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from apps.cms.models import GroupPackage, GroupBenefit

def populate_groups():
    print("Populating Groups Data...")

    # 1. Group Packages
    packages = [
        {
            "name": "School Groups",
            "subtitle": "Perfect for field trips & educational outings",
            "min_size": "15+ Students",
            "icon": "Building2",
            "price": 699,
            "price_note": "per student",
            "features": [
                "Discounted group rates",
                "Teacher/Chaperone free entry",
                "Dedicated supervision area",
                "Flexible timing slots",
                "Educational team building activities",
                "Safe & secure environment"
            ],
            "color": "primary",
            "popular": False,
            "order": 1
        },
        {
            "name": "Corporate Teams",
            "subtitle": "Team building & employee engagement",
            "min_size": "10+ Employees",
            "icon": "Trophy",
            "price": 799,
            "price_note": "per person",
            "features": [
                "Customized team challenges",
                "Private session options",
                "Corporate invoicing available",
                "Refreshments can be arranged",
                "Team building activities",
                "Photography services available"
            ],
            "color": "secondary",
            "popular": True,
            "order": 2
        },
        {
            "name": "Friends & Family",
            "subtitle": "Large group celebrations",
            "min_size": "10+ People",
            "icon": "Users",
            "price": 749,
            "price_note": "per person",
            "features": [
                "Group discount pricing",
                "Extended play time options",
                "Dedicated party area",
                "Flexible group size",
                "Perfect for reunions",
                "Special occasion packages"
            ],
            "color": "accent",
            "popular": False,
            "order": 3
        }
    ]

    for data in packages:
        # Using name as unique identifier for get_or_create
        pkg, created = GroupPackage.objects.get_or_create(
            name=data["name"],
            defaults={
                "subtitle": data["subtitle"],
                "min_size": data["min_size"],
                "icon": data["icon"],
                "price": data["price"],
                "price_note": data["price_note"],
                "features": data["features"],
                "color": data["color"],
                "popular": data["popular"],
                "order": data["order"],
                "active": True
            }
        )
        if created:
            print(f"Created package: {pkg.name}")
        else:
            pkg.subtitle = data["subtitle"]
            pkg.features = data["features"]
            pkg.price = data["price"]
            pkg.save()
            print(f"Updated package: {pkg.name}")

    # 2. Group Benefits
    benefits = [
        {
            "title": "Exclusive Discounts",
            "description": "Save more with larger groups",
            "icon": "Sparkles",
            "order": 1
        },
        {
            "title": "Flexible Scheduling",
            "description": "Book at your preferred time",
            "icon": "Clock",
            "order": 2
        },
        {
            "title": "Dedicated Support",
            "description": "Personal coordinator for your group",
            "icon": "Users",
            "order": 3
        },
        {
            "title": "Custom Activities",
            "description": "Tailored experiences for your group",
            "icon": "Trophy",
            "order": 4
        }
    ]

    for data in benefits:
        benefit, created = GroupBenefit.objects.get_or_create(
            title=data["title"],
            defaults={
                "description": data["description"],
                "icon": data["icon"],
                "order": data["order"],
                "active": True
            }
        )
        if created:
            print(f"Created benefit: {benefit.title}")
        else:
            benefit.description = data["description"]
            benefit.icon = data["icon"]
            benefit.save()
            print(f"Updated benefit: {benefit.title}")

    print("Groups Data Population Done!")

if __name__ == "__main__":
    populate_groups()
