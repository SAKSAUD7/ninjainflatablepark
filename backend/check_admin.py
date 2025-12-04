#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from django.contrib import admin
from apps.bookings.models import PartyBooking, Booking, Customer, Waiver

# Check if models are registered
print("Checking Django Admin Registration:")
print("=" * 50)

registered_models = admin.site._registry
print(f"\nTotal registered models: {len(registered_models)}")

bookings_models = [PartyBooking, Booking, Customer, Waiver]
for model in bookings_models:
    if model in registered_models:
        print(f"✅ {model.__name__} is registered")
    else:
        print(f"❌ {model.__name__} is NOT registered")

# Check database for party bookings
print("\n" + "=" * 50)
print("Party Bookings in Database:")
print("=" * 50)

party_bookings = PartyBooking.objects.all().order_by('-created_at')
if party_bookings.exists():
    print(f"\nFound {party_bookings.count()} party booking(s):\n")
    for booking in party_bookings[:10]:  # Show first 10
        print(f"ID: {booking.id}")
        print(f"  Name: {booking.name}")
        print(f"  Email: {booking.email}")
        print(f"  Date: {booking.date}")
        print(f"  Status: {booking.status}")
        print(f"  Created: {booking.created_at}")
        print()
else:
    print("\nNo party bookings found in database")

# Check regular bookings
bookings = Booking.objects.all().order_by('-created_at')
print("=" * 50)
print(f"Regular Bookings: {bookings.count()}")
print("=" * 50)
