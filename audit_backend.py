import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from apps.cms.models import PageSection, PartyPackage, Attraction
from apps.bookings.models import Booking

def audit_backend():
    print("Starting Backend Audit...")
    
    # 1. Content Objects
    print(f"\n--- Content ---")
    print(f"Page Sections: {PageSection.objects.count()}")
    for p in PageSection.objects.values_list('page', flat=True).distinct():
        count = PageSection.objects.filter(page=p).count()
        print(f"  - {p}: {count} sections")
        
    print(f"Attractions: {Attraction.objects.count()}")
    print(f"Party Packages: {PartyPackage.objects.count()}")
    
    # 2. Business Objects
    print(f"\n--- Business ---")
    print(f"Bookings: {Booking.objects.count()}")
    
    print("\nAudit Complete.")

if __name__ == "__main__":
    audit_backend()
