import os
import django
import sys
from datetime import time

# Setup Django environment
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from apps.cms.models import PageSection, PartyPackage

def populate_parties():
    print("Populating Parties Page Data...")

    # 1. Hero Section
    # Check if exists, if not create
    hero, created = PageSection.objects.get_or_create(
        page='party-booking',
        section_key='hero',
        defaults={
            'title': 'PARTY PACKAGES',
            'subtitle': 'Celebrate your special day with us! Choose from our exciting party packages designed for maximum fun.',
            'image_url': '/park-slides-action.jpg',
            'active': True,
            'order': 0
        }
    )
    if created:
        print("✅ Created Hero Section")
    else:
        print("ℹ️ Hero Section already exists")

    # 2. Terms & Conditions
    # Using the content from the current public page
    terms_content = """
    <ul class="list-disc pl-5 space-y-2">
        <li>Minimum of 10 participants required for all party packages.</li>
        <li>A non-refundable deposit is required to secure your booking.</li>
        <li>Party duration includes jump time and party room access.</li>
        <li>Outside food and drinks are not permitted (except for birthday cakes).</li>
        <li>Waivers must be signed for all participants.</li>
        <li>Socks are required for all jumpers.</li>
    </ul>
    """
    
    terms, created = PageSection.objects.get_or_create(
        page='party-booking',
        section_key='terms',
        defaults={
            'title': 'Parties Terms & Conditions',
            'content': terms_content.strip(),
            'active': True,
            'order': 1
        }
    )
    if created:
        print("✅ Created Terms Section")
    else:
        print("ℹ️ Terms Section already exists")
        # Optional: Update content if it was empty
        if not terms.content:
            terms.content = terms_content.strip()
            terms.save()
            print("   -> Updated Terms content")

    # 3. Verify Party Packages
    packages = PartyPackage.objects.all()
    print(f"ℹ️ Found {packages.count()} Party Packages")
    if packages.count() == 0:
        print("⚠️ No party packages found! You should check populate_sample_data.py or add them via admin.")

if __name__ == "__main__":
    populate_parties()
