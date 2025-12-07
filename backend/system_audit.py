
import os
import sys
import django

# Setup Django Environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from apps.core.models import User
from apps.cms.models import (
    Page, Activity, Banner, ContactMessage, PartyPackage, 
    Faq
)
from apps.bookings.models import Booking, PartyBooking, Customer

def audit_model(name, model):
    try:
        count = model.objects.count()
        print(f"[{name}]")
        print(f"  - Count: {count}")
        if count > 0:
            latest = model.objects.last()
            print(f"  - Latest Example: {latest}")
    except Exception as e:
        print(f"[{name}] ERROR: {e}")
    print("-" * 30)

print("=== SYSTEM AUDIT START ===\n")

audit_model("Users", User)
audit_model("CMS Pages", Page)
audit_model("Activities (Attractions)", Activity)
audit_model("Banners", Banner)
audit_model("Contact Messages", ContactMessage)
audit_model("Party Packages", PartyPackage)
audit_model("FAQs", Faq)
audit_model("Session Bookings", Booking)
audit_model("Party Bookings", PartyBooking)
audit_model("Customers", Customer)

print("\n=== SYSTEM AUDIT END ===")
