from rest_framework import viewsets, permissions
from .models import Customer, Booking, Waiver, Transaction, BookingBlock
from .serializers import CustomerSerializer, BookingSerializer, WaiverSerializer, TransactionSerializer, BookingBlockSerializer

from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAdminUser]

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    
    def get_permissions(self):
        # Allow public access for create, list (for duplicate checking), and ticket retrieval
        if self.action in ['create', 'list', 'ticket']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    @action(detail=False, methods=['get'], url_path='ticket/(?P<uuid>[^/.]+)')
    def ticket(self, request, uuid=None):
        booking = get_object_or_404(Booking, uuid=uuid)
        serializer = self.get_serializer(booking)
        return Response(serializer.data)

class WaiverViewSet(viewsets.ModelViewSet):
    queryset = Waiver.objects.all()
    serializer_class = WaiverSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAdminUser]

class BookingBlockViewSet(viewsets.ModelViewSet):
    queryset = BookingBlock.objects.all()
    serializer_class = BookingBlockSerializer
    permission_classes = [permissions.IsAdminUser]
