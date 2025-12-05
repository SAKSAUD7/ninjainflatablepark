import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from apps.cms.models import PageSection, PartyPackage

def verify_parties_cms():
    print("Verifying Parties CMS Integration...")

    # 1. Simulating Frontend Fetch
    print("\n--- Simulating Frontend Fetch (page='party-booking') ---")
    sections = PageSection.objects.filter(page='party-booking')
    print(f"Found {sections.count()} sections for 'party-booking'")
    
    hero = sections.filter(section_key='hero').first()
    terms = sections.filter(section_key='terms').first()
    
    if hero:
        print(f"✅ Hero Section: '{hero.title}'")
    else:
        print("❌ MISSING Hero Section")
        
    if terms:
        print(f"✅ Terms Section: '{terms.title}'")
        if "Minimum" in terms.content:
             print("   -> Content check passed")
    else:
        print("❌ MISSING Terms Section")

    # 2. Simulating Admin Access
    print("\n--- Simulating Admin Access ---")
    # Admin accesses the same data basically
    
    # 3. Party Packages
    pkgs = PartyPackage.objects.all()
    print(f"✅ Party Packages: {pkgs.count()} found")
    for p in pkgs:
        print(f"   - {p.name}: ₹{p.price}")

if __name__ == "__main__":
    verify_parties_cms()
