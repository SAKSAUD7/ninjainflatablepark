import os
import django
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.bookings.models import Waiver

# Get all field names from the Waiver model
waiver_fields = [f.name for f in Waiver._meta.get_fields()]
print("Waiver model fields:")
for field in sorted(waiver_fields):
    print(f"  - {field}")

print("\n" + "=" * 50)
print("Fields declared in WaiverSerializer:")
serializer_fields = ['id', 'name', 'email', 'phone', 'dob', 'participant_type', 'is_primary_signer',
                  'signed_at', 'version', 'emergency_contact', 'ip_address', 'minors', 'adults',
                  'booking', 'party_booking', 'customer', 'created_at', 'updated_at',
                  'booking_details', 'party_booking_details', 'booking_type', 'booking_reference']

for field in serializer_fields:
    if field in ['booking_details', 'party_booking_details', 'booking_type', 'booking_reference']:
        print(f"  - {field} (SerializerMethodField)")
    elif field in waiver_fields:
        print(f"  - {field} (model field)")
    else:
        print(f"  - {field} (NOT FOUND IN MODEL!)")
