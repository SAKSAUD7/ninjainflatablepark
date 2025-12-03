from django.contrib import admin
from .models import Customer, Booking, Waiver, Transaction, PartyBooking

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'created_at']
    search_fields = ['name', 'email', 'phone']
    list_filter = ['created_at']
    ordering = ['-created_at']

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email', 'date', 'time', 'booking_status', 'payment_status', 'amount']
    list_filter = ['booking_status', 'payment_status', 'waiver_status', 'type', 'date']
    search_fields = ['name', 'email', 'phone', 'qr_code']
    ordering = ['-created_at']
    date_hierarchy = 'date'

@admin.register(Waiver)
class WaiverAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'signed_at', 'version']
    search_fields = ['name', 'email', 'phone']
    list_filter = ['signed_at', 'version']
    ordering = ['-signed_at']

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['id', 'booking', 'amount', 'method', 'status', 'created_at']
    list_filter = ['method', 'status', 'created_at']
    search_fields = ['booking__name', 'booking__email']
    ordering = ['-created_at']

@admin.register(PartyBooking)
class PartyBookingAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email', 'date', 'time', 'booking_status', 'payment_status', 'amount', 'party_package']
    list_filter = ['booking_status', 'payment_status', 'waiver_status', 'date', 'decorations', 'catering']
    search_fields = ['name', 'email', 'phone', 'qr_code', 'birthday_child_name']
    ordering = ['-created_at']
    date_hierarchy = 'date'
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Party Details', {
            'fields': ('date', 'time', 'duration', 'party_package', 'theme')
        }),
        ('Birthday Child', {
            'fields': ('birthday_child_name', 'birthday_child_age')
        }),
        ('Guest Count', {
            'fields': ('adults', 'kids', 'spectators')
        }),
        ('Add-ons', {
            'fields': ('decorations', 'catering', 'cake', 'photographer', 'party_favors')
        }),
        ('Special Requests', {
            'fields': ('special_requests', 'dietary_restrictions')
        }),
        ('Pricing', {
            'fields': ('subtotal', 'discount_amount', 'amount', 'voucher_code')
        }),
        ('Status', {
            'fields': ('booking_status', 'payment_status', 'waiver_status', 'qr_code')
        }),
        ('Relationships', {
            'fields': ('customer', 'voucher')
        }),
    )

