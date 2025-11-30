#!/bin/bash

# Smoke Test Script for Backend API
# Tests critical endpoints to ensure the backend is working correctly

API_URL="http://localhost:4000/api"
TOKEN=""

echo "🧪 Starting Backend API Smoke Tests"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Helper function to test endpoint
test_endpoint() {
    local name=$1
    local method=$2
    local endpoint=$3
    local data=$4
    local expected_status=$5
    
    echo -n "Testing: $name... "
    
    if [ -z "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method "$API_URL$endpoint" \
            -H "Authorization: Bearer $TOKEN" \
            -H "Content-Type: application/json")
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$API_URL$endpoint" \
            -H "Authorization: Bearer $TOKEN" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi
    
    status=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$status" == "$expected_status" ]; then
        echo -e "${GREEN}✅ PASSED${NC} (HTTP $status)"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}❌ FAILED${NC} (Expected HTTP $expected_status, got $status)"
        echo "Response: $body"
        ((FAILED++))
        return 1
    fi
}

# 1. Health Check
echo "1️⃣  Health Check"
health_response=$(curl -s -w "\n%{http_code}" "http://localhost:4000/health")
health_status=$(echo "$health_response" | tail -n1)
health_body=$(echo "$health_response" | sed '$d')

if [ "$health_status" == "200" ]; then
    echo -e "${GREEN}✅ PASSED${NC} (HTTP $health_status)"
    ((PASSED++))
else
    echo -e "${RED}❌ FAILED${NC} (Expected HTTP 200, got $health_status)"
    echo "Response: $health_body"
    ((FAILED++))
fi
echo ""

# 2. Authentication Test
echo "2️⃣  Authentication"
login_response=$(curl -s -X POST "$API_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@ninjapark.com","password":"admin123"}')

TOKEN=$(echo $login_response | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -n "$TOKEN" ]; then
    echo -e "${GREEN}✅ Login successful${NC}"
    echo "Token: ${TOKEN:0:20}..."
    ((PASSED++))
else
    echo -e "${RED}❌ Login failed${NC}"
    echo "Response: $login_response"
    ((FAILED++))
    echo ""
    echo "⚠️  Cannot continue without authentication"
    exit 1
fi
echo ""

# 3. Booking Creation Test
echo "3️⃣  Booking Creation"
booking_data='{
    "name":"Test User",
    "email":"test@example.com",
    "phone":"9876543210",
    "date":"2025-12-15",
    "time":"10:00",
    "duration":"60",
    "adults":2,
    "kids":1,
    "spectators":0
}'

booking_response=$(curl -s -X POST "$API_URL/bookings" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$booking_data")

booking_id=$(echo $booking_response | grep -o '"id":"[^"]*' | cut -d'"' -f4)

if [ -n "$booking_id" ]; then
    echo -e "${GREEN}✅ Booking created${NC}"
    echo "Booking ID: $booking_id"
    ((PASSED++))
else
    echo -e "${RED}❌ Booking creation failed${NC}"
    echo "Response: $booking_response"
    ((FAILED++))
fi
echo ""

# 4. Waiver Creation Test
echo "4️⃣  Waiver Creation"
waiver_data='{
    "name":"Adult User 1",
    "email":"adult1@example.com",
    "phone":"9876543211",
    "dob":"1990-01-01",
    "bookingId":"'$booking_id'"
}'

test_endpoint "Create adult waiver 1" "POST" "/waivers" "$waiver_data" "201"
test_endpoint "Create adult waiver 2" "POST" "/waivers" '{"name":"Adult User 2","email":"adult2@example.com","phone":"9876543212","dob":"1992-05-15","bookingId":"'$booking_id'"}' "201"
test_endpoint "Create minor waiver" "POST" "/waivers" '{"name":"Minor User","email":"parent@example.com","phone":"9876543213","dob":"2015-03-20","minors":[{"name":"Child","dob":"2015-03-20"}],"bookingId":"'$booking_id'"}' "201"
echo ""

# 5. Calendar Block Test
echo "5️⃣  Calendar & Availability"
block_data='{
    "startDate":"2025-12-25T00:00:00Z",
    "endDate":"2025-12-25T23:59:59Z",
    "reason":"Christmas Holiday",
    "type":"CLOSED"
}'

test_endpoint "Create booking block" "POST" "/calendar/blocks" "$block_data" "201"
test_endpoint "Check availability (blocked date)" "GET" "/calendar/availability?date=2025-12-25&time=10:00" "" "200"
echo ""

# 6. Voucher Test
echo "6️⃣  Voucher Management"
voucher_data='{
    "code":"TEST50",
    "discountType":"PERCENTAGE",
    "discountValue":50,
    "usageLimit":10,
    "description":"Test voucher"
}'

test_endpoint "Create voucher" "POST" "/vouchers" "$voucher_data" "201"
test_endpoint "Validate voucher" "POST" "/vouchers/validate" '{"code":"TEST50"}' "200"
echo ""

# 7. Dashboard Stats
echo "7️⃣  Dashboard Statistics"
test_endpoint "Get dashboard stats" "GET" "/bookings/stats" "" "200"
echo ""

# 8. CMS Endpoints
echo "8️⃣  CMS Management"
test_endpoint "Get activities" "GET" "/cms/activities" "" "200"
test_endpoint "Get banners" "GET" "/cms/banners" "" "200"
test_endpoint "Get FAQs" "GET" "/cms/faqs" "" "200"
echo ""

# 9. Settings
echo "9️⃣  Settings"
test_endpoint "Get settings" "GET" "/settings" "" "200"
echo ""

# 10. Audit Logs
echo "🔟 Audit Logs"
test_endpoint "Get audit logs" "GET" "/logs" "" "200"
echo ""

# Summary
echo "===================================="
echo "📊 Test Summary"
echo "===================================="
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo "Total: $((PASSED + FAILED))"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed${NC}"
    exit 1
fi
