from django.db import models
from apps.shop.models import Voucher
import uuid

class Customer(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Booking(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('CANCELLED', 'Cancelled'),
        ('COMPLETED', 'Completed'),
    ]
    PAYMENT_STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('PAID', 'Paid'),
        ('REFUNDED', 'Refunded'),
        ('FAILED', 'Failed'),
    ]
    WAIVER_STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('SIGNED', 'Signed'),
    ]
    TYPE_CHOICES = [
        ('SESSION', 'Session'),
        ('PARTY', 'Party'),
        ('MANUAL', 'Manual'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    date = models.DateField()
    time = models.TimeField()
    duration = models.IntegerField(help_text="Duration in minutes")
    adults = models.IntegerField(default=0)
    kids = models.IntegerField(default=0)
    spectators = models.IntegerField(default=0)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    voucher_code = models.CharField(max_length=50, null=True, blank=True)
    
    status = models.CharField(max_length=20, default='CONFIRMED') # Legacy
    booking_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    waiver_status = models.CharField(max_length=20, choices=WAIVER_STATUS_CHOICES, default='PENDING')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='PENDING')
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='SESSION')
    qr_code = models.CharField(max_length=255, unique=True, null=True, blank=True)
    
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    voucher = models.ForeignKey(Voucher, on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Booking {self.id} - {self.name}"

class PartyBooking(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('CANCELLED', 'Cancelled'),
        ('COMPLETED', 'Completed'),
    ]
    
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    date = models.DateField()
    time = models.TimeField()
    package_name = models.CharField(max_length=255)
    kids = models.IntegerField(default=0)
    adults = models.IntegerField(default=0)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    birthday_child_name = models.CharField(max_length=255, null=True, blank=True)
    birthday_child_age = models.IntegerField(null=True, blank=True)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True, related_name='party_bookings')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Party {self.id} - {self.name}"

class Waiver(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50, null=True, blank=True)
    file_url = models.URLField(null=True, blank=True)
    signed_at = models.DateTimeField(auto_now_add=True)
    version = models.CharField(max_length=20)
    emergency_contact = models.CharField(max_length=255, null=True, blank=True)
    dob = models.DateField(null=True, blank=True)
    minors = models.JSONField(null=True, blank=True) # List of {name, dob}
    adults = models.JSONField(null=True, blank=True) # List of {name, email, phone, dob}
    
    booking = models.ForeignKey(Booking, on_delete=models.SET_NULL, null=True, blank=True, related_name='waivers')
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True, related_name='waivers')

    def __str__(self):
        return f"Waiver for {self.name}"

class Transaction(models.Model):
    METHOD_CHOICES = [
        ('STRIPE', 'Stripe'),
        ('CASH', 'Cash'),
        ('RAZORPAY', 'Razorpay'),
    ]
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('PAID', 'Paid'),
        ('REFUNDED', 'Refunded'),
        ('FAILED', 'Failed'),
    ]

    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='INR')
    transaction_id = models.CharField(max_length=255, unique=True)
    payment_method = models.CharField(max_length=20, choices=METHOD_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_id} - {self.amount} {self.currency}"

class BookingBlock(models.Model):
    TYPE_CHOICES = [
        ('CLOSED', 'Closed'),
        ('MAINTENANCE', 'Maintenance'),
        ('PRIVATE_EVENT', 'Private Event'),
        ('OTHER', 'Other'),
    ]

    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    reason = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='CLOSED')
    recurring = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Block: {self.reason} ({self.start_date} - {self.end_date})"
