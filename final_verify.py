import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from apps.cms.models import PageSection

def verify_and_fix_final():
    print("FINAL VERIFICATION OF CMS ISOLATION")
    
    pages = [
        'home', 'attractions', 'pricing', 'guidelines', 
        'parties', 'party-booking', 'contact', 'groups'
    ]
    
    # 1. Inspect All Records
    print("\n--- Current Database State ---")
    all_heroes = PageSection.objects.filter(section_key='hero')
    for h in all_heroes:
        print(f"ID: {h.id} | Page: '{h.page}' | Title: '{h.title}'")

    # 2. Simulation Test
    print("\n--- Simulation Test ---")
    
    # Fetch Home
    home_hero = PageSection.objects.get(page='home', section_key='hero')
    print(f"Original Home Title: {home_hero.title}")
    
    # Fetch Attractions
    attr_hero = PageSection.objects.get(page='attractions', section_key='hero')
    print(f"Original Attractions Title: {attr_hero.title}")
    
    # Modify Attractions
    print(">> Modifying Attractions Title to 'TEST UPDATE'...")
    attr_hero.title = "TEST UPDATE"
    attr_hero.save()
    
    # Re-fetch Home to verify it didn't change
    home_hero.refresh_from_db()
    print(f"Post-Update Home Title: {home_hero.title}")
    
    if home_hero.title == "TEST UPDATE":
        print("❌ FAILURE: Home title was overwritten!")
    else:
        print("✅ SUCCESS: Home title remained unchanged.")

if __name__ == "__main__":
    verify_and_fix_final()
