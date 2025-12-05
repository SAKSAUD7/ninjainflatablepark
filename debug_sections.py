import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from apps.cms.models import PageSection

def debug_page_sections():
    print("Debugging Page Sections...")
    sections = PageSection.objects.all()
    print(f"Total Sections: {sections.count()}")
    for s in sections:
        print(f"ID: {s.id} | Page: '{s.page}' | Key: '{s.section_key}' | Title: '{s.title}'")

if __name__ == "__main__":
    debug_page_sections()
