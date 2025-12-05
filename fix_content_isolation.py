import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from apps.cms.models import PageSection

def fix_content_isolation():
    print("Fixing Content Isolation...")

    # Define validation list of required unique pages and their default titles
    pages = {
        'home': {
            'title': 'ARE YOU A NINJA?', 
            'content': 'Get ready to jump, climb, bounce, and conquer the ultimate inflatable adventure!'
        },
        'attractions': {
            'title': 'OUR ATTRACTIONS', 
            'content': 'Explore our world-class inflatable courses and ninja challenges!'
        },
        'pricing': {
            'title': 'TICKETS & PACKAGES', 
            'content': 'Choose the perfect pass for your adventure.'
        },
        'guidelines': {
            'title': 'SAFETY & RULES', 
            'content': 'Please read our safety guidelines carefully before jumping.'
        },
        'parties': {
            'title': 'PARTY PACKAGES', 
            'content': 'Celebrate your special day with us!'
        },
        'party-booking': {
            'title': 'BOOK YOUR PARTY', 
            'content': 'Complete the form below to reserve your celebration.'
        },
        'contact': {
            'title': 'CONTACT US', 
            'content': 'We are here to help! Get in touch with our team.'
        },
        'groups': {
            'title': 'GROUP BOOKINGS', 
            'content': 'Special rates for schools, corporates, and large groups.'
        }
    }

    # Common default image if none exists
    default_image = '/park-slides-action.jpg'

    # 1. Get existing sections
    current_sections = PageSection.objects.filter(section_key='hero')
    print(f"Current Hero Sections: {current_sections.count()}")
    
    # 2. Iterate through required pages
    for page_slug, defaults in pages.items():
        # Check if specific section exists
        section = PageSection.objects.filter(page=page_slug, section_key='hero').first()
        
        if section:
            print(f"✅ FOUND: {page_slug} - {section.title} (ID: {section.id})")
        else:
            print(f"⚠️ MISSING: {page_slug} - Creating new isolated record...")
            
            # Create new isolated record
            new_section = PageSection.objects.create(
                page=page_slug,
                section_key='hero',
                title=defaults['title'],
                subtitle=defaults['content'], # Map content to subtitle/content based on model usage
                content=defaults['content'],
                image_url=default_image,
                active=True,
                order=0
            )
            print(f"✨ CREATED: {page_slug} - {new_section.title} (ID: {new_section.id})")

    print("\nVerification:")
    final_sections = PageSection.objects.filter(section_key='hero')
    for s in final_sections:
        print(f"- Page: '{s.page}' | ID: {s.id} | Title: '{s.title}'")

if __name__ == "__main__":
    fix_content_isolation()
