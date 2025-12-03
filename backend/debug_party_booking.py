import requests
import json

# Test party booking creation with payload matching frontend
url = "http://localhost:8000/api/v1/bookings/party-bookings/"

# Payload matching createPartyBooking.ts
payload = {
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9845471611",
    "date": "2025-12-15",
    "time": "4:00 PM", # Frontend sends this format "4:00 PM"
    "duration": 120,
    "adults": 0,
    "kids": 10,
    "spectators": 0,
    "birthday_child_name": "Birthday Kid",
    "birthday_child_age": 8,
    "party_package": None,
    "theme": None,
    "decorations": False,
    "catering": False,
    "cake": False,
    "photographer": False,
    "party_favors": False,
    "special_requests": "Test booking",
    "dietary_restrictions": None,
    "subtotal": 15000,
    "amount": 17700,
    "discount_amount": 0,
    "booking_status": "PENDING",
    "payment_status": "PENDING",
    "waiver_status": "PENDING",
}

print("Sending payload:", json.dumps(payload, indent=2))

try:
    response = requests.post(url, json=payload, headers={"Content-Type": "application/json"})
    print(f"Status Code: {response.status_code}")
    if response.status_code != 201:
        print(f"Error Response: {response.text}")
    else:
        print(f"Success Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
