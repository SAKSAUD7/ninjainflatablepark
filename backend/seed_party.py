
import os
import django
import sys
import decimal

# Add backend directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.cms.models import PartyPackage

# Data with "more text" as requested
package_data = {
    "name": "Standard Party Package",
    "price": decimal.Decimal("1500.00"),
    "description": "The ultimate ninja party experience! Perfect for birthdays, celebrations, and group events.",
    "min_participants": 10,
    "max_participants": 30,
    "duration": 120,
    "includes": [
        "90 Mins Ninja Park Access",
        "30 Mins Private Party Room",
        "Dedicated Party Host",
        "Ninja Grip Socks for All",
        "E-Invitations",
        "Setup & Cleanup Included",
        "Gift for Birthday Child"
    ],
    "addons": ["Pizza Package", "Unlimited Drinks", "Cake Service"],
    "popular": True,
    "variant": "primary",
    "active": True,
    "order": 0
}

# Create or Update
pkg, created = PartyPackage.objects.get_or_create(
    name=package_data['name'],
    defaults=package_data
)

if not created:
    pkg.description = package_data['description']
    pkg.includes = package_data['includes']
    pkg.addons = package_data['addons']
    pkg.price = package_data['price']
    pkg.min_participants = package_data['min_participants']
    pkg.duration = package_data['duration']
    pkg.save()

print(f"{'Created' if created else 'Updated'} Party Package: {pkg.name}")
