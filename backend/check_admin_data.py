#!/usr/bin/env python
import requests
import json

base_url = "http://localhost:8000/api/v1"

print("=" * 60)
print("CHECKING ADMIN DASHBOARD DATA")
print("=" * 60)

# 1. Check Dashboard Stats
print("\n1. Dashboard Stats:")
print("-" * 60)
try:
    response = requests.get(f"{base_url}/core/dashboard/stats/")
    if response.ok:
        data = response.json()
        print(f"✅ Status: {response.status_code}")
        print(f"Total Bookings: {data.get('totalBookings')}")
        print(f"Session Bookings: {data.get('sessionBookings')}")
        print(f"Party Bookings: {data.get('partyBookings')}")
        print(f"Total Revenue: ₹{data.get('totalRevenue', 0):,.2f}")
        print(f"Pending Waivers: {data.get('pendingWaivers')}")
        print(f"Total Waivers: {data.get('totalWaivers')}")
        print(f"Total Customers: {data.get('totalCustomers')}")
    else:
        print(f"❌ Error: {response.status_code}")
        print(response.text[:200])
except Exception as e:
    print(f"❌ Error: {e}")

# 2. Check All Bookings Endpoint
print("\n2. All Bookings:")
print("-" * 60)
try:
    response = requests.get(f"{base_url}/core/dashboard/all-bookings/")
    if response.ok:
        data = response.json()
        print(f"✅ Status: {response.status_code}")
        print(f"Total Count: {data.get('count')}")
        if data.get('results'):
            print("\nFirst 3 bookings:")
            for booking in data['results'][:3]:
                print(f"  - {booking.get('type')}: {booking.get('name')} - ₹{booking.get('amount', 0):,.2f}")
    else:
        print(f"❌ Error: {response.status_code}")
except Exception as e:
    print(f"❌ Error: {e}")

# 3. Check Party Bookings
print("\n3. Party Bookings:")
print("-" * 60)
try:
    response = requests.get(f"{base_url}/bookings/party-bookings/")
    if response.ok:
        data = response.json() if isinstance(response.json(), list) else [response.json()]
        print(f"✅ Status: {response.status_code}")
        print(f"Count: {len(data)}")
        if data:
            print("\nFirst 3 party bookings:")
            for booking in data[:3]:
                print(f"  - ID {booking.get('id')}: {booking.get('name')} - ₹{booking.get('amount', 0):,.2f}")
    else:
        print(f"❌ Error: {response.status_code}")
except Exception as e:
    print(f"❌ Error: {e}")

# 4. Check Regular Bookings
print("\n4. Regular Bookings:")
print("-" * 60)
try:
    response = requests.get(f"{base_url}/bookings/bookings/")
    if response.ok:
        data = response.json()
        results = data.get('results', data) if isinstance(data, dict) else data
        print(f"✅ Status: {response.status_code}")
        print(f"Count: {len(results) if isinstance(results, list) else 'N/A'}")
    else:
        print(f"❌ Error: {response.status_code}")
except Exception as e:
    print(f"❌ Error: {e}")

# 5. Check Waivers
print("\n5. Waivers:")
print("-" * 60)
try:
    response = requests.get(f"{base_url}/bookings/waivers/")
    if response.ok:
        data = response.json()
        results = data.get('results', data) if isinstance(data, dict) else data
        print(f"✅ Status: {response.status_code}")
        print(f"Count: {len(results) if isinstance(results, list) else 'N/A'}")
    else:
        print(f"❌ Error: {response.status_code}")
except Exception as e:
    print(f"❌ Error: {e}")

print("\n" + "=" * 60)
