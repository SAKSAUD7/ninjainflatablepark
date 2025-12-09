from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import InvitationTemplate, BookingInvitation
from .serializers import InvitationTemplateSerializer, BookingInvitationSerializer, PublicInvitationSerializer
from apps.bookings.models import PartyBooking

class InvitationTemplateViewSet(viewsets.ModelViewSet):
    queryset = InvitationTemplate.objects.all()
    serializer_class = InvitationTemplateSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def create(self, request, *args, **kwargs):
        print("------- INVITATION TEMPLATE CREATE STARTED -------")
        if 'background_image' in request.FILES:
            file = request.FILES['background_image']
            print(f"File received: {file.name}, Size: {file.size} bytes")
        else:
            print("No background image received.")
        
        try:
            response = super().create(request, *args, **kwargs)
            print("------- INVITATION TEMPLATE CREATE SUCCESS -------")
            return response
        except Exception as e:
            print(f"------- INVITATION TEMPLATE CREATE FAILED: {e} -------")
            raise

class BookingInvitationViewSet(viewsets.ModelViewSet):
    queryset = BookingInvitation.objects.all()
    serializer_class = BookingInvitationSerializer
    permission_classes = [permissions.AllowAny] # TODO: Secure this more in production

    @action(detail=False, methods=['get'], url_path='public/(?P<uuid>[^/.]+)')
    def public_view(self, request, uuid=None):
        try:
            invitation = BookingInvitation.objects.get(uuid=uuid)
            serializer = PublicInvitationSerializer(invitation)
            return Response(serializer.data)
        except BookingInvitation.DoesNotExist:
            return Response({"error": "Invitation not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='create-or-update')
    def create_or_update(self, request):
        booking_id = request.data.get('booking_id')
        if not booking_id:
            return Response({"error": "Booking ID required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            booking = PartyBooking.objects.get(id=booking_id)
            invitation, created = BookingInvitation.objects.get_or_create(booking=booking)
            
            serializer = BookingInvitationSerializer(invitation, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except PartyBooking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)
