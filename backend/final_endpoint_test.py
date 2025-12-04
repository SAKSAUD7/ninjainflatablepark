#!/usr/bin/env python
import requests

endpoints = {
    "Dashboard Stats": "http://localhost:8000/api/v1/core/dashboard/stats/",
    "All Bookings": "http://localhost:8000/api/v1/core/dashboard/all_bookings/",
    "Session Bookings": "http://localhost:8000/api/v1/bookings/bookings/",
    "Party Bookings": "http://localhost:8000/api/v1/bookings/party-bookings/",
}

print("FINAL ENDPOINT TEST")
print("=" * 80)

for name, url in endpoints.items():
    print(f"\n{name}:")
    print("-" * 80)
    try:
        r = requests.get(url, timeout=5)
        if r.ok:
            data = r.json()
            if isinstance(data, dict):
                count = data.get('count', len(data.get('results', [])))
                print(f"  Status: 200 OK")
                print(f"  Count: {count}")
            elif isinstance(data, list):
                print(f"  Status: 200 OK")
                print(f"  Count: {len(data)}")
            else:
                print(f"  Status: 200 OK")
                print(f"  Data: {str(data)[:100]}")
        else:
            print(f"  Status: {r.status_code} FAILED")
    except Exception as e:
        print(f"  ERROR: {str(e)[:100]}")

print("\n" + "=" * 80)
print("TEST COMPLETE")
print("=" * 80)
