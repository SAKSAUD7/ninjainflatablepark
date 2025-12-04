#!/usr/bin/env python
import requests

base_url = "http://localhost:8000/api/v1"

tests = [
    ("Dashboard Stats", f"{base_url}/core/dashboard/stats/"),
    ("All Bookings", f"{base_url}/core/dashboard/all-bookings/"),
    ("Regular Bookings", f"{base_url}/bookings/bookings/"),
    ("Party Bookings", f"{base_url}/bookings/party-bookings/"),
    ("Waivers", f"{base_url}/bookings/waivers/"),
]

print("ENDPOINT TEST RESULTS")
print("=" * 60)

for name, url in tests:
    try:
        response = requests.get(url, timeout=5)
        status = "OK" if response.ok else "FAIL"
        print(f"{name:20} | Status: {response.status_code:3} | {status}")
        if not response.ok:
            print(f"  Error: {response.text[:100]}")
    except Exception as e:
        print(f"{name:20} | ERROR: {str(e)[:50]}")

print("=" * 60)
