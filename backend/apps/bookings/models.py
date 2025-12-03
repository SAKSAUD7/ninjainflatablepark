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

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(max_length=20, choices=METHOD_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='transactions')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.method} - {self.amount}"

class BookingBlock(models.Model):
    TYPE_CHOICES = [
        ('MAINTENANCE', 'Maintenance'),
        ('PRIVATE_EVENT', 'Private Event'),
        ('HOLIDAY', 'Holiday'),
        ('OTHER', 'Other'),
    ]

    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    reason = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='OTHER')
    recurring = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Block: {self.reason} ({self.start_date})"

class PartyBooking(models.Model):
    """
    Dedicated model for party bookings with party-specific fields
    """
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
    
    # Contact Information
    name = models.CharField(max_length=255, help_text="Party organizer name")
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    
    # Party Details
    date = models.DateField()
    time = models.TimeField()
    duration = models.IntegerField(help_text="Duration in minutes", default=120)
    
    # Guest Count
    adults = models.IntegerField(default=0)
    kids = models.IntegerField(default=0)
    spectators = models.IntegerField(default=0, help_text="Non-participating guests")
    
    # Party-Specific Fields
    party_package = models.CharField(max_length=100, null=True, blank=True, help_text="Selected party package")
    theme = models.CharField(max_length=100, null=True, blank=True, help_text="Party theme")
    birthday_child_name = models.CharField(max_length=255, null=True, blank=True)
    birthday_child_age = models.IntegerField(null=True, blank=True)
    
    # Add-ons
    decorations = models.BooleanField(default=False)
    catering = models.BooleanField(default=False)
    cake = models.BooleanField(default=False)
    photographer = models.BooleanField(default=False)
    party_favors = models.BooleanField(default=False)
    
    # Special Requests
    special_requests = models.TextField(null=True, blank=True)
    dietary_restrictions = models.TextField(null=True, blank=True)
    
    # Pricing
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    voucher_code = models.CharField(max_length=50, null=True, blank=True)
    
    # Status Fields
    booking_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    waiver_status = models.CharField(max_length=20, choices=WAIVER_STATUS_CHOICES, default='PENDING')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='PENDING')
    qr_code = models.CharField(max_length=255, unique=True, null=True, blank=True)
    
    # Relationships
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True, related_name='party_bookings')
    voucher = models.ForeignKey(Voucher, on_delete=models.SET_NULL, null=True, blank=True, related_name='party_bookings')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Party Booking'
        verbose_name_plural = 'Party Bookings'
    
    def __str__(self):
        return f"Party Booking {self.id} - {self.name} ({self.date})"

