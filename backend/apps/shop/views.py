from rest_framework import viewsets, permissions
from .models import Product, Voucher
from .serializers import ProductSerializer, VoucherSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

class VoucherViewSet(viewsets.ModelViewSet):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    
    def get_permissions(self):
        # Allow public access for list (voucher validation by code)
        if self.action == 'list':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
