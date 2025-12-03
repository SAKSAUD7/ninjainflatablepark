from rest_framework import serializers
from .models import Customer, Booking, Waiver, Transaction, BookingBlock, PartyBooking
from apps.shop.serializers import VoucherSerializer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

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
    booking_details = SimpleBookingSerializer(source='booking', read_only=True)

    class Meta:
        model = Waiver
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    customer_details = CustomerSerializer(source='customer', read_only=True)
    voucher_details = VoucherSerializer(source='voucher', read_only=True)
    transactions = TransactionSerializer(many=True, read_only=True)
    waivers = WaiverSerializer(many=True, read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'

class PartyBookingSerializer(serializers.ModelSerializer):
    customer_details = CustomerSerializer(source='customer', read_only=True)
    voucher_details = VoucherSerializer(source='voucher', read_only=True)
    
    class Meta:
        model = PartyBooking
        fields = '__all__'

