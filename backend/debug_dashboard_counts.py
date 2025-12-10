import os
import sys
import django
from django.utils import timezone
from datetime import date

# Add the current directory to sys.path
sys.path.append(os.getcwd())

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from apps.bookings.models import Booking, PartyBooking

def check_dashboard_stats():
    today = timezone.now().date()
    with open('debug_output_utf8.txt', 'w', encoding='utf-8') as f:
        f.write(f"Checking stats for Date: {today}\n")
        
        # 1. Bookings Today
        f.write("\n--- BOOKINGS TODAY ---\n")
        session_today = Booking.objects.filter(date=today).exclude(status='CANCELLED')
        party_today = PartyBooking.objects.filter(date=today).exclude(status='CANCELLED')
        
        f.write(f"Session Bookings Today: {session_today.count()}\n")
        for b in session_today:
            f.write(f" - Session ID {b.id}: {b.name} ({b.status})\n")
            
        f.write(f"Party Bookings Today: {party_today.count()}\n")
        for p in party_today:
            f.write(f" - Party ID {p.id}: {p.name} ({p.status})\n")
            
        total_today = session_today.count() + party_today.count()
        f.write(f"TOTAL CALCULATED: {total_today}\n")

        # 2. Pending Waivers
        f.write("\n--- PENDING WAIVERS ---\n")
        session_pending = Booking.objects.filter(waiver_status='PENDING').exclude(status='CANCELLED')
        party_pending = PartyBooking.objects.filter(waiver_signed=False).exclude(status='CANCELLED')
        
        f.write(f"Session Waivers Pending: {session_pending.count()}\n")
        # List first 5 for brevity
        for b in session_pending[:5]:
            f.write(f" - Session ID {b.id}: {b.name}, Date: {b.date} (Waiver: {b.waiver_status})\n")
            
        f.write(f"Party Waivers Pending: {party_pending.count()}\n")
        for p in party_pending[:5]:
            f.write(f" - Party ID {p.id}: {p.name}, Date: {p.date} (Waiver: {p.waiver_signed})\n")

        total_pending = session_pending.count() + party_pending.count()
        f.write(f"TOTAL PENDING WAIVERS: {total_pending}\n")

if __name__ == "__main__":
    check_dashboard_stats()
