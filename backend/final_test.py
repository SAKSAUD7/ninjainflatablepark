#!/usr/bin/env python
import requests
import json

base_url = "http://localhost:8000/api/v1"

print("COMPREHENSIVE ENDPOINT TEST")
print("=" * 80)

# Test 1: Dashboard Stats
print("\n1. Dashboard Stats:")
try:
    r = requests.get(f"{base_url}/core/dashboard/stats/")
    print(f"   Status: {r.status_code}")
    if r.ok:
        data = r.json()
        print(f"   Total Bookings: {data.get('totalBookings')}")
        print(f"   Total Revenue: {data.get('totalRevenue')}")
        print(f"   Session Bookings: {data.get('sessionBookings')}")
        print(f"   Party Bookings: {data.get('partyBookings')}")
    else:
        print(f"   ERROR: {r.text[:100]}")
except Exception as e:
    print(f"   EXCEPTION: {e}")

# Test 2: All Bookings
print("\n2. All Bookings (combined):")
try:
    r = requests.get(f"{base_url}/core/dashboard/all-bookings/")
    print(f"   Status: {r.status_code}")
    if r.ok:
        data = r.json()
        print(f"   Count: {data.get('count')}")
        if data.get('results'):
            print(f"   First booking: {data['results'][0].get('name')} - ${data['results'][0].get('amount')}")
    else:
        print(f"   ERROR: {r.text[:100]}")
except Exception as e:
    print(f"   EXCEPTION: {e}")

# Test 3: Party Bookings
print("\n3. Party Bookings:")
try:
    r = requests.get(f"{base_url}/bookings/party-bookings/")
    print(f"   Status: {r.status_code}")
    if r.ok:
        data = r.json()
        count = len(data) if isinstance(data, list) else data.get('count', 0)
        print(f"   Count: {count}")
        if isinstance(data, list) and data:
            print(f"   First booking: {data[0].get('name')} - ${data[0].get('amount')}")
    else:
        print(f"   ERROR: {r.text[:100]}")
except Exception as e:
    print(f"   EXCEPTION: {e}")

# Test 4: Session Bookings
print("\n4. Session Bookings:")
try:
    r = requests.get(f"{base_url}/bookings/bookings/")
    print(f"   Status: {r.status_code}")
    if r.ok:
        data = r.json()
        results = data.get('results', []) if isinstance(data, dict) else data
        print(f"   Count: {len(results)}")
    else:
        print(f"   ERROR: {r.text[:100]}")
except Exception as e:
    print(f"   EXCEPTION: {e}")

# Test 5: Waivers
print("\n5. Waivers:")
try:
    r = requests.get(f"{base_url}/bookings/waivers/")
    print(f"   Status: {r.status_code}")
    if r.ok:
        data = r.json()
        results = data.get('results', []) if isinstance(data, dict) else data
        print(f"   Count: {len(results)}")
    else:
        print(f"   ERROR: {r.text[:100]}")
except Exception as e:
    print(f"   EXCEPTION: {e}")

print("\n" + "=" * 80)
print("TEST COMPLETE")
print("=" * 80)
