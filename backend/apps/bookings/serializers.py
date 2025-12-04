from rest_framework import serializers
from .models import Customer, Booking, Waiver, Transaction, BookingBlock, PartyBooking
# from apps.shop.serializers import VoucherSerializer

class CustomerSerializer(serializers.ModelSerializer):
    booking_count = serializers.IntegerField(read_only=True)
    total_spent = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    last_visit = serializers.DateField(read_only=True)

    class Meta:
        model = Customer
        fields = ['id', 'name', 'email', 'phone', 'notes', 'created_at', 'updated_at', 
                  'booking_count', 'total_spent', 'last_visit']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class BookingBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingBlock
        fields = '__all__'

# Simple booking serializer WITHOUT waivers to avoid circular reference
class SimpleBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'name', 'email', 'phone', 'date', 'time', 'duration', 
                  'adults', 'kids', 'spectators', 'amount', 'status', 'booking_status',
                  'payment_status', 'waiver_status', 'type', 'created_at', 'updated_at']

class WaiverSerializer(serializers.ModelSerializer):
    # booking_details = SimpleBookingSerializer(source='booking', read_only=True)  # Temporarily disabled
    # party_booking_details = serializers.SerializerMethodField()  # Temporarily disabled
    # booking_type = serializers.SerializerMethodField()  # Temporarily disabled
    # booking_reference = serializers.SerializerMethodField()  # Temporarily disabled
    
    class Meta:
        model = Waiver
        fields = '__all__'
    
    def get_party_booking_details(self, obj):
        if obj.party_booking:
            return {
                'id': obj.party_booking.id,
                'name': obj.party_booking.name,
                'email': obj.party_booking.email,
                'phone': obj.party_booking.phone,
                'date': str(obj.party_booking.date),
                'time': str(obj.party_booking.time),
                'package_name': obj.party_booking.package_name,
                'kids': obj.party_booking.kids,
                'adults': obj.party_booking.adults,
                'amount': float(obj.party_booking.amount),
                'status': obj.party_booking.status,
            }
        return None
    
    def get_booking_type(self, obj):
        if obj.booking:
            return 'SESSION'
        elif obj.party_booking:
            return 'PARTY'
        return 'UNKNOWN'
    
    def get_booking_reference(self, obj):
        if obj.booking:
            return f"Session #{obj.booking.id}"
        elif obj.party_booking:
            return f"Party #{obj.party_booking.id}"
        return "Walk-in"

class BookingSerializer(serializers.ModelSerializer):
    customer_details = CustomerSerializer(source='customer', read_only=True)
    # voucher_details = VoucherSerializer(source='voucher', read_only=True)
    transactions = TransactionSerializer(many=True, read_only=True)
    # Removed waivers field to avoid circular reference

    class Meta:
        model = Booking
        fields = ['id', 'uuid', 'name', 'email', 'phone', 'date', 'time', 'duration',
                  'adults', 'kids', 'spectators', 'subtotal', 'discount_amount', 'amount',
                  'voucher_code', 'status', 'booking_status', 'payment_status', 'waiver_status',
                  'type', 'qr_code', 'customer', 'customer_details', 'voucher', 'transactions',
                  'created_at', 'updated_at']

class PartyBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartyBooking
        fields = ['id', 'uuid', 'name', 'email', 'phone', 'date', 'time', 'package_name', 
                  'kids', 'adults', 'amount', 'birthday_child_name', 'birthday_child_age',
                  'participants', 'waiver_signed', 'waiver_signed_at', 'waiver_ip_address',
                  'status', 'customer', 'created_at', 'updated_at']


