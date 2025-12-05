import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from apps.cms.models import PageSection

def deduplicate_content():
    print("Deduplicating Content to Ensure Isolation...")

    pages = [
        'home', 'attractions', 'pricing', 'guidelines', 
        'parties', 'party-booking', 'contact', 'groups'
    ]
    
    # 1. Check if ANY pages are sharing the same ID (this shouldn't happen in DB design but checking logically)
    # Actually, we can't share IDs. The problem is if they fetched the SAME ID.
    # What we need to ensure is that there is a DISTINCT record for every page.
    
    for page in pages:
        sections = PageSection.objects.filter(page=page, section_key='hero')
        count = sections.count()
        
        if count == 0:
            print(f"⚠️ {page}: No record found. Creating new...")
            PageSection.objects.create(
                page=page,
                section_key='hero',
                title=f"{page.upper()} HERO",
                content=f"Content for {page}",
                image_url='/park-slides-action.jpg',
                active=True,
                order=0
            )
        elif count == 1:
            s = sections.first()
            print(f"✅ {page}: OK (ID: {s.id})")
        else:
            print(f"⚠️ {page}: Found {count} records! Cleaning up duplicates...")
            # Keep the last updated one
            to_keep = sections.last()
            for s in sections:
                if s.id != to_keep.id:
                    print(f"   Deleting duplicate ID: {s.id}")
                    s.delete()
            print(f"   Kept ID: {to_keep.id}")

    print("\nFinal Verification:")
    all_sections = PageSection.objects.filter(section_key='hero')
    for s in all_sections:
        print(f"ID: {s.id} | Page: '{s.page}'")

if __name__ == "__main__":
    deduplicate_content()
