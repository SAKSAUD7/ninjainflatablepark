from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    profile_pic = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    role = models.CharField(max_length=50, default='STAFF')
    
    # Use email as the unique identifier
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name']

    def __str__(self):
        return self.email

class GlobalSettings(models.Model):
    park_name = models.CharField(max_length=255, default="Ninja Inflatable Park")
    contact_phone = models.CharField(max_length=50, default="+91 98454 71611")
    contact_email = models.EmailField(default="info@ninjapark.com")
    address = models.TextField(null=True, blank=True)
    map_url = models.URLField(null=True, blank=True)
    opening_hours = models.JSONField(default=dict, blank=True)
    marquee_text = models.JSONField(default=list, blank=True)
    about_text = models.TextField(null=True, blank=True)
    hero_title = models.CharField(max_length=255, null=True, blank=True)
    hero_subtitle = models.CharField(max_length=255, null=True, blank=True)
    gst_number = models.CharField(max_length=50, null=True, blank=True)
    session_duration = models.IntegerField(default=60) # minutes
    adult_price = models.DecimalField(max_digits=10, decimal_places=2, default=899.00)
    child_price = models.DecimalField(max_digits=10, decimal_places=2, default=500.00)
    
    # Feature Toggles
    online_booking_enabled = models.BooleanField(default=True)
    party_bookings_enabled = models.BooleanField(default=True)
    maintenance_mode = models.BooleanField(default=False)
    waiver_required = models.BooleanField(default=True)
    
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Global Settings"
        verbose_name_plural = "Global Settings"

    def __str__(self):
        return "Global Settings"
