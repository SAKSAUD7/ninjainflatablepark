from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomerViewSet, BookingViewSet, WaiverViewSet, TransactionViewSet, BookingBlockViewSet

router = DefaultRouter()
router.register(r'customers', CustomerViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'waivers', WaiverViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'booking-blocks', BookingBlockViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
