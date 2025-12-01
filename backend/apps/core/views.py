from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Sum, Count, Avg
from datetime import timedelta

from .models import User, GlobalSettings
from .serializers import UserSerializer, GlobalSettingsSerializer

from apps.bookings.models import Booking, Waiver, Customer
from apps.bookings.serializers import BookingSerializer
from apps.shop.models import Voucher
from apps.cms.models import Activity, Testimonial, Faq, Banner

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class GlobalSettingsViewSet(viewsets.ModelViewSet):
    queryset = GlobalSettings.objects.all()
    serializer_class = GlobalSettingsSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

class DashboardViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAdminUser]

    @action(detail=False, methods=['get'])
    def stats(self, request):
        today = timezone.now().date()
        first_day_of_month = today.replace(day=1)

        # Bookings
        bookings_today = Booking.objects.filter(date=today).exclude(status='CANCELLED').count()
        total_bookings = Booking.objects.exclude(status='CANCELLED').count()
        session_bookings = Booking.objects.filter(type='SESSION').exclude(status='CANCELLED').count()
        party_bookings = Booking.objects.filter(type='PARTY').exclude(status='CANCELLED').count()

        # Revenue
        total_revenue = Booking.objects.exclude(status='CANCELLED').aggregate(Sum('amount'))['amount__sum'] or 0
        
        # Waivers
        pending_waivers = Booking.objects.filter(waiver_status='PENDING').exclude(status='CANCELLED').count()
        total_waivers = Waiver.objects.count()
        signed_waivers = total_waivers # Assuming all in DB are signed for now as per original logic

        # Recent Bookings
        recent_bookings_qs = Booking.objects.select_related('customer').order_by('-created_at')[:5]
        recent_bookings = BookingSerializer(recent_bookings_qs, many=True).data

        # Revenue Chart (last 7 days)
        # Simplified: just getting raw data, frontend can group if needed or we group here
        # Doing simple grouping here
        monthly_revenue = []
        for i in range(6, -1, -1):
            d = today - timedelta(days=i)
            day_revenue = Booking.objects.filter(date=d).exclude(status='CANCELLED').aggregate(Sum('amount'))['amount__sum'] or 0
            monthly_revenue.append({
                "name": d.strftime('%a'),
                "total": day_revenue
            })

        # Customers
        total_customers = Customer.objects.count()
        new_customers_month = Customer.objects.filter(created_at__gte=first_day_of_month).count()
        
        # Repeat customers (naive implementation)
        repeat_customers = Customer.objects.annotate(booking_count=Count('bookings')).filter(booking_count__gt=1).count()

        # Vouchers
        active_vouchers = Voucher.objects.filter(is_active=True).count()
        total_voucher_redemptions = Voucher.objects.aggregate(Sum('used_count'))['used_count__sum'] or 0

        # Content
        total_activities = Activity.objects.filter(active=True).count()
        total_testimonials = Testimonial.objects.filter(active=True).count()
        total_faqs = Faq.objects.filter(active=True).count()
        total_banners = Banner.objects.filter(active=True).count()

        # Avg Booking Value
        avg_booking_value = Booking.objects.exclude(status='CANCELLED').aggregate(Avg('amount'))['amount__avg'] or 0

        waiver_completion_rate = 100 if total_waivers == 0 else int((signed_waivers / total_waivers) * 100)

        return Response({
            "bookingsToday": bookings_today,
            "totalBookings": total_bookings,
            "totalRevenue": total_revenue,
            "pendingWaivers": pending_waivers,
            "recentBookings": recent_bookings,
            "monthlyRevenue": monthly_revenue,
            "sessionBookings": session_bookings,
            "partyBookings": party_bookings,
            "totalCustomers": total_customers,
            "newCustomersMonth": new_customers_month,
            "repeatCustomers": repeat_customers,
            "activeVouchers": active_vouchers,
            "redeemedVouchers": total_voucher_redemptions,
            "totalActivities": total_activities,
            "totalTestimonials": total_testimonials,
            "totalFaqs": total_faqs,
            "totalBanners": total_banners,
            "avgBookingValue": round(avg_booking_value),
            "waiverCompletionRate": waiver_completion_rate,
            "totalWaivers": total_waivers,
            "signedWaivers": signed_waivers
        })
