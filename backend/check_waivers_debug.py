import os
import django
import sys

# Add the project root to the python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.bookings.models import Waiver, Booking, PartyBooking

def check_waivers():
    waiver_count = Waiver.objects.count()
    print(f"Total Waivers: {waiver_count}")
    
    if waiver_count > 0:
        print("\nLast 5 Waivers:")
        for waiver in Waiver.objects.all().order_by('-created_at')[:5]:
            print(f"- ID: {waiver.id}, Name: {waiver.name}, Type: {waiver.participant_type}, Signed: {waiver.signed_at}")
    else:
        print("\nNo waivers found in the database.")

    # Check bookings to see if we have any that *should* have waivers
    print(f"\nTotal Bookings: {Booking.objects.count()}")
    print(f"Total Party Bookings: {PartyBooking.objects.count()}")

if __name__ == "__main__":
    check_waivers()
