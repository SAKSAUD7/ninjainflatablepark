import os
import django
import sys

# Setup Django environment
sys.path.append(os.getcwd())
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.bookings.models import PartyBooking

uuid_to_check = "de2486e6-f7be-415d-8087-9978b1c2912a"

try:
    booking = PartyBooking.objects.get(uuid=uuid_to_check)
    print(f"✅ Booking FOUND: ID={booking.id}, UUID={booking.uuid}, Name={booking.name}")
    
    # Test serialization
    from apps.bookings.serializers import PartyBookingSerializer
    from rest_framework.request import Request
    from django.test.client import RequestFactory
    
    factory = RequestFactory()
    request = factory.get('/')
    
    serializer = PartyBookingSerializer(booking, context={'request': Request(request)})
    data = serializer.data
    
    print("\n✅ Serialization Successful!")
    print(f"QR Code: {data.get('qr_code')}")
    print(f"Duration: {data.get('duration')}")
    print(f"Booking Status: {data.get('booking_status')}")
    
except PartyBooking.DoesNotExist:
    print(f"❌ Booking NOT FOUND for UUID: {uuid_to_check}")
except Exception as e:
    print(f"⚠️ Error during check: {e}")
    import traceback
    traceback.print_exc()
