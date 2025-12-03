import requests
import json

# Test party booking creation
url = "http://localhost:8000/api/v1/bookings/party-bookings/"

payload = {
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9845471611",
    "date": "2025-12-15",
    "time": "14:00:00",
    "duration": 120,
    "adults": 0,
    "kids": 15,
    "spectators": 5,
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
    "subtotal": 22500,
    "amount": 26550,
    "discount_amount": 0,
    "booking_status": "PENDING",
    "payment_status": "PENDING",
    "waiver_status": "PENDING",
}

try:
    response = requests.post(url, json=payload, headers={"Content-Type": "application/json"})
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
