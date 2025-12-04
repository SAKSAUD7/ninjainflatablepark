from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Customer, Booking, Waiver, Transaction, BookingBlock, PartyBooking
from .serializers import CustomerSerializer, BookingSerializer, WaiverSerializer, TransactionSerializer, BookingBlockSerializer, PartyBookingSerializer
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from django.http import HttpResponse
from django.utils import timezone
import json

from django.db.models import Sum, Count, Max, Q

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        queryset = Customer.objects.annotate(
            booking_count=Count('bookings'),
            total_spent=Sum('bookings__amount'),
            last_visit=Max('bookings__date')
        )
        
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(email__icontains=search) | 
                Q(phone__icontains=search)
            )
            
        return queryset

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    
    def get_permissions(self):
        # Allow public access for create, list (for duplicate checking), and ticket retrieval
        if self.action in ['create', 'list', 'ticket', 'retrieve']:
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
        if self.action in ['create', 'list']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
    
    @action(detail=True, methods=['get'])
    def download_pdf(self, request, pk=None):
        """Generate and download waiver PDF"""
        waiver = self.get_object()
        
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="waiver_{waiver.id}.pdf"'
        
        p = canvas.Canvas(response, pagesize=letter)
        width, height = letter
        
        # Header
        p.setFont("Helvetica-Bold", 24)
        p.drawString(1 * inch, height - 1 * inch, "Ninja Inflatable Park")
        p.setFont("Helvetica", 12)
        p.drawString(1 * inch, height - 1.3 * inch, "Liability Waiver & Release Form")
        
        # Waiver Details
        y = height - 2 * inch
        p.setFont("Helvetica-Bold", 14)
        p.drawString(1 * inch, y, "Participant Information")
        y -= 0.3 * inch
        
        p.setFont("Helvetica", 12)
        p.drawString(1 * inch, y, f"Name: {waiver.name}")
        y -= 0.25 * inch
        p.drawString(1 * inch, y, f"Type: {waiver.participant_type}")
        y -= 0.25 * inch
        if waiver.dob:
            p.drawString(1 * inch, y, f"Date of Birth: {waiver.dob}")
            y -= 0.25 * inch
        if waiver.email:
            p.drawString(1 * inch, y, f"Email: {waiver.email}")
            y -= 0.25 * inch
        if waiver.phone:
            p.drawString(1 * inch, y, f"Phone: {waiver.phone}")
            y -= 0.25 * inch
            
        # Booking Info
        y -= 0.5 * inch
        p.setFont("Helvetica-Bold", 14)
        p.drawString(1 * inch, y, "Booking Details")
        y -= 0.3 * inch
        p.setFont("Helvetica", 12)
        
        if waiver.booking:
            p.drawString(1 * inch, y, f"Booking ID: {waiver.booking.id}")
            y -= 0.25 * inch
            p.drawString(1 * inch, y, f"Date: {waiver.booking.date}")
        elif waiver.party_booking:
            p.drawString(1 * inch, y, f"Party Booking ID: {waiver.party_booking.id}")
            y -= 0.25 * inch
            p.drawString(1 * inch, y, f"Date: {waiver.party_booking.date}")
            
        # Agreement
        y -= 0.5 * inch
        p.setFont("Helvetica-Bold", 14)
        p.drawString(1 * inch, y, "Agreement")
        y -= 0.3 * inch
        p.setFont("Helvetica", 10)
        text = "By signing this document, I acknowledge that I have read and understood the terms and conditions of the Ninja Inflatable Park liability waiver. I voluntarily assume all risks associated with participation."
        
        p.drawString(1 * inch, y, text[:90])
        p.drawString(1 * inch, y - 15, text[90:])
        
        # Signature
        y -= 1.5 * inch
        p.setFont("Helvetica-Bold", 12)
        p.drawString(1 * inch, y, "Signed By:")
        p.line(2 * inch, y, 5 * inch, y)
        p.drawString(2 * inch, y + 5, waiver.name)
        
        y -= 0.5 * inch
        p.drawString(1 * inch, y, "Date:")
        p.drawString(2 * inch, y, waiver.signed_at.strftime('%Y-%m-%d %H:%M') if waiver.signed_at else 'N/A')
        
        y -= 0.5 * inch
        p.drawString(1 * inch, y, "IP Address:")
        p.drawString(2 * inch, y, waiver.ip_address or 'N/A')
        
        p.showPage()
        p.save()
        return response
    
    @action(detail=False, methods=['get'])
    def export_csv(self, request):
        """Export all waivers to CSV"""
        import csv
        from django.http import HttpResponse
        
        waivers = self.get_queryset()
        
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="waivers.csv"'
        
        writer = csv.writer(response)
        writer.writerow(['ID', 'Name', 'Email', 'Phone', 'Type', 'Signed Date', 'Booking Type', 'Booking ID', 'DOB', 'Emergency Contact'])
        
        for waiver in waivers:
            booking_type = 'Session' if waiver.booking else ('Party' if waiver.party_booking else 'Walk-in')
            booking_id = waiver.booking.id if waiver.booking else (waiver.party_booking.id if waiver.party_booking else 'N/A')
            
            writer.writerow([
                waiver.id,
                waiver.name,
                waiver.email or '',
                waiver.phone or '',
                waiver.participant_type,
                waiver.signed_at.strftime('%Y-%m-%d %H:%M') if waiver.signed_at else '',
                booking_type,
                booking_id,
                waiver.dob.strftime('%Y-%m-%d') if waiver.dob else '',
                waiver.emergency_contact or ''
            ])
        
        return response
    
    @action(detail=False, methods=['get'])
    def by_booking(self, request):
        """Get all waivers for a specific booking"""
        booking_id = request.query_params.get('booking_id')
        party_booking_id = request.query_params.get('party_booking_id')
        
        if booking_id:
            waivers = self.queryset.filter(booking_id=booking_id)
        elif party_booking_id:
            waivers = self.queryset.filter(party_booking_id=party_booking_id)
        else:
            return Response({'error': 'Please provide booking_id or party_booking_id'}, status=400)
        
        serializer = self.get_serializer(waivers, many=True)
        return Response(serializer.data)


# Custom function-based view for waiver listing (bypasses serializer bug)
@api_view(['GET', 'POST'])
@permission_classes([permissions.AllowAny])
def waiver_list_view(request):
    """Custom view to list/create waivers without using ModelSerializer"""
    if request.method == 'GET':
        # List all waivers
        waivers = Waiver.objects.all().order_by('-created_at')
        data = []
        for waiver in waivers:
            waiver_data = {
                'id': waiver.id,
                'name': waiver.name,
                'email': waiver.email,
                'phone': waiver.phone,
                'dob': str(waiver.dob) if waiver.dob else None,
                'participant_type': waiver.participant_type,
                'is_primary_signer': waiver.is_primary_signer,
                'signed_at': waiver.signed_at.isoformat() if waiver.signed_at else None,
                'version': waiver.version,
                'emergency_contact': waiver.emergency_contact,
                'ip_address': waiver.ip_address,
                'minors': waiver.minors,
                'adults': waiver.adults,
                'booking': waiver.booking.id if waiver.booking else None,
                'party_booking': waiver.party_booking.id if waiver.party_booking else None,
                'customer': waiver.customer.id if waiver.customer else None,
                'created_at': waiver.created_at.isoformat(),
                'updated_at': waiver.updated_at.isoformat(),
            }
            
            # Add booking reference
            if waiver.booking:
                waiver_data['booking_reference'] = f"Session #{waiver.booking.id}"
                waiver_data['booking_type'] = 'SESSION'
            elif waiver.party_booking:
                waiver_data['booking_reference'] = f"Party #{waiver.party_booking.id}"
                waiver_data['booking_type'] = 'PARTY'
            else:
                waiver_data['booking_reference'] = "Walk-in"
                waiver_data['booking_type'] = 'UNKNOWN'
            
            data.append(waiver_data)
        return Response(data)
    
    elif request.method == 'POST':
        try:
            data = request.data
            ip_address = request.META.get('REMOTE_ADDR')
            
            # Create waiver
            waiver = Waiver.objects.create(
                name=data.get('name'),
                email=data.get('email'),
                phone=data.get('phone'),
                dob=data.get('dob'),
                participant_type=data.get('participant_type', 'ADULT'),
                is_primary_signer=data.get('is_primary_signer', False),
                version=data.get('version', '1.0'),
                emergency_contact=data.get('emergency_contact'),
                ip_address=ip_address,
                minors=data.get('minors'),
                adults=data.get('adults'),
                booking_id=data.get('booking'),
                party_booking_id=data.get('party_booking'),
                customer_id=data.get('customer'),
            )
            
            return Response({
                'id': waiver.id,
                'name': waiver.name,
                'email': waiver.email,
                'participant_type': waiver.participant_type,
                'signed_at': waiver.signed_at.isoformat(),
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({
                'error': str(e),
                'detail': 'Failed to create waiver'
            }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def waiver_detail_view(request, id):
    """Custom view to get waiver details with booking and participant information"""
    try:
        waiver = Waiver.objects.get(pk=id)
        
        waiver_data = {
            'id': waiver.id,
            'name': waiver.name,
            'email': waiver.email,
            'phone': waiver.phone,
            'dob': str(waiver.dob) if waiver.dob else None,
            'participant_type': waiver.participant_type,
            'is_primary_signer': waiver.is_primary_signer,
            'signed_at': waiver.signed_at.isoformat() if waiver.signed_at else None,
            'version': waiver.version,
            'emergency_contact': waiver.emergency_contact,
            'ip_address': waiver.ip_address,
            'minors': waiver.minors,
            'adults': waiver.adults,
            'created_at': waiver.created_at.isoformat(),
            'updated_at': waiver.updated_at.isoformat(),
        }
        
        # Add booking details if exists
        if waiver.booking:
            waiver_data['booking'] = {
                'id': waiver.booking.id,
                'name': waiver.booking.name,
                'email': waiver.booking.email,
                'phone': waiver.booking.phone,
                'date': str(waiver.booking.date),
                'time': str(waiver.booking.time),
                'adults': waiver.booking.adults,
                'kids': waiver.booking.kids,
                'spectators': waiver.booking.spectators,
                'amount': float(waiver.booking.amount),
                'status': waiver.booking.booking_status,
            }
            waiver_data['booking_reference'] = f"Session #{waiver.booking.id}"
            waiver_data['booking_type'] = 'SESSION'
        elif waiver.party_booking:
            waiver_data['party_booking'] = {
                'id': waiver.party_booking.id,
                'name': waiver.party_booking.name,
                'email': waiver.party_booking.email,
                'phone': waiver.party_booking.phone,
                'date': str(waiver.party_booking.date),
                'time': str(waiver.party_booking.time),
                'package_name': waiver.party_booking.package_name,
                'kids': waiver.party_booking.kids,
                'adults': waiver.party_booking.adults,
                'amount': float(waiver.party_booking.amount),
                'status': waiver.party_booking.status,
                'birthday_child_name': waiver.party_booking.birthday_child_name,
                'birthday_child_age': waiver.party_booking.birthday_child_age,
                'participants': waiver.party_booking.participants,
            }
            waiver_data['booking_reference'] = f"Party #{waiver.party_booking.id}"
            waiver_data['booking_type'] = 'PARTY'
        else:
            waiver_data['booking_reference'] = "Walk-in"
            waiver_data['booking_type'] = 'UNKNOWN'
        
        return Response(waiver_data)
    except Waiver.DoesNotExist:
        return Response({'error': 'Waiver not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAdminUser]

class BookingBlockViewSet(viewsets.ModelViewSet):
    queryset = BookingBlock.objects.all()
    serializer_class = BookingBlockSerializer
    permission_classes = [permissions.IsAdminUser]

# Custom function-based view for party booking creation (bypasses serializer bug)
@api_view(['POST', 'GET'])
@permission_classes([permissions.AllowAny])
def create_party_booking_view(request):
    """Custom view to create party bookings without using ModelSerializer"""
    if request.method == 'GET':
        # List all party bookings
        bookings = PartyBooking.objects.all().order_by('-created_at')
        data = []
        for booking in bookings:
            data.append({
                'id': booking.id,
                'uuid': str(booking.uuid),
                'name': booking.name,
                'email': booking.email,
                'phone': booking.phone,
                'date': str(booking.date),
                'time': str(booking.time),
                'package_name': booking.package_name,
                'kids': booking.kids,
                'adults': booking.adults,
                'amount': float(booking.amount),
                'birthday_child_name': booking.birthday_child_name,
                'birthday_child_age': booking.birthday_child_age,
                'status': booking.status,
                'created_at': booking.created_at.isoformat(),
                'updated_at': booking.updated_at.isoformat(),
            })
        return Response(data)
    
    elif request.method == 'POST':
        try:
            data = request.data
            
            # Create or get customer
            customer = None
            if data.get('email'):
                customer, created = Customer.objects.get_or_create(
                    email=data['email'],
                    defaults={
                        'name': data.get('name', ''),
                        'phone': data.get('phone', ''),
                    }
                )
                if not created and not customer.name:
                    customer.name = data.get('name', '')
                    customer.phone = data.get('phone', '')
                    customer.save()
            
            # Create party booking
            booking = PartyBooking.objects.create(
                name=data.get('name'),
                email=data.get('email'),
                phone=data.get('phone'),
                date=data.get('date'),
                time=data.get('time'),
                package_name=data.get('package_name', 'Standard Party'),
                kids=int(data.get('kids', 0)),
                adults=int(data.get('adults', 0)),
                amount=float(data.get('amount', 0)),
                birthday_child_name=data.get('birthday_child_name'),
                birthday_child_age=int(data.get('birthday_child_age')) if data.get('birthday_child_age') else None,
                status=data.get('status', 'PENDING'),
                customer=customer,
                waiver_signed=data.get('waiver_signed', False),
            )
            
            return Response({
                'id': booking.id,
                'uuid': str(booking.uuid),
                'name': booking.name,
                'email': booking.email,
                'phone': booking.phone,
                'date': str(booking.date),
                'time': str(booking.time),
                'package_name': booking.package_name,
                'kids': booking.kids,
                'adults': booking.adults,
                'amount': float(booking.amount),
                'birthday_child_name': booking.birthday_child_name,
                'birthday_child_age': booking.birthday_child_age,
                'status': booking.status,
                'created_at': booking.created_at.isoformat(),
                'updated_at': booking.updated_at.isoformat(),
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({
                'error': str(e),
                'detail': 'Failed to create party booking'
            }, status=status.HTTP_400_BAD_REQUEST)

class PartyBookingViewSet(viewsets.ModelViewSet):
    queryset = PartyBooking.objects.all()
    serializer_class = PartyBookingSerializer
    
    def get_permissions(self):
        # Allow public access for create, list (for duplicate checking), and ticket retrieval
        if self.action in ['create', 'list', 'ticket']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    @action(detail=False, methods=['get'], url_path='ticket/(?P<uuid>[^/.]+)')
    def ticket(self, request, uuid=None):
        party_booking = get_object_or_404(PartyBooking, uuid=uuid)
        serializer = self.get_serializer(party_booking)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_participants(self, request, pk=None):
        """Add participant details to party booking and create individual waivers"""
        from django.utils import timezone
        
        party_booking = self.get_object()
        participants = request.data.get('participants', {})
        waiver_signed = request.data.get('waiver_signed', False)
        ip_address = request.META.get('REMOTE_ADDR')
        
        # Save participants data
        party_booking.participants = participants
        party_booking.waiver_signed = waiver_signed
        if waiver_signed:
            party_booking.waiver_signed_at = timezone.now()
            party_booking.waiver_ip_address = ip_address
        party_booking.save()
        
        # Create individual waiver records for adults
        for adult in participants.get('adults', []):
            Waiver.objects.create(
                name=adult.get('name'),
                email=adult.get('email'),
                phone=adult.get('phone'),
                dob=adult.get('dob'),
                participant_type='ADULT',
                is_primary_signer=adult.get('is_primary', False),
                party_booking=party_booking,
                customer=party_booking.customer,
                ip_address=ip_address,
                version='1.0'
            )
        
        # Create individual waiver records for minors
        for minor in participants.get('minors', []):
            Waiver.objects.create(
                name=minor.get('name'),
                dob=minor.get('dob'),
                participant_type='MINOR',
                party_booking=party_booking,
                customer=party_booking.customer,
                ip_address=ip_address,
                version='1.0',
                emergency_contact=minor.get('guardian')
            )
        
        return Response({
            'success': True,
            'message': 'Participants added successfully',
            'waiver_count': len(participants.get('adults', [])) + len(participants.get('minors', []))
        })


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def add_party_participants_view(request, uuid):
    """
    Custom view to add participants to a party booking identified by UUID.
    This bypasses the PartyBookingViewSet lookup which expects integer PKs.
    """
    from django.utils import timezone
    
    party_booking = get_object_or_404(PartyBooking, uuid=uuid)
    participants = request.data.get('participants', {})
    waiver_signed = request.data.get('waiver_signed', False)
    ip_address = request.META.get('REMOTE_ADDR')
    
    # Save participants data
    party_booking.participants = participants
    party_booking.waiver_signed = waiver_signed
    if waiver_signed:
        party_booking.waiver_signed_at = timezone.now()
        party_booking.waiver_ip_address = ip_address
    party_booking.save()
    
    # Create individual waiver records for adults
    for adult in participants.get('adults', []):
        Waiver.objects.create(
            name=adult.get('name'),
            email=adult.get('email'),
            phone=adult.get('phone'),
            dob=adult.get('dob'),
            participant_type='ADULT',
            is_primary_signer=adult.get('is_primary', False),
            party_booking=party_booking,
            customer=party_booking.customer,
            ip_address=ip_address,
            version='1.0'
        )
    
    # Create individual waiver records for minors
    for minor in participants.get('minors', []):
        Waiver.objects.create(
            name=minor.get('name'),
            dob=minor.get('dob'),
            participant_type='MINOR',
            party_booking=party_booking,
            customer=party_booking.customer,
            ip_address=ip_address,
            version='1.0',
            emergency_contact=minor.get('guardian')
        )
    
    return Response({
        'success': True,
        'message': 'Participants added successfully',
        'waiver_count': len(participants.get('adults', [])) + len(participants.get('minors', []))
    })

@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([permissions.IsAdminUser])
def party_booking_detail_view(request, id):
    """Custom view to get/update/delete party booking details by ID"""
    try:
        party_booking = PartyBooking.objects.get(pk=id)
        
        if request.method == 'GET':
            data = {
                'id': party_booking.id,
                'uuid': str(party_booking.uuid),
                'name': party_booking.name,
                'email': party_booking.email,
                'phone': party_booking.phone,
                'date': str(party_booking.date),
                'time': str(party_booking.time),
                'package_name': party_booking.package_name,
                'kids': party_booking.kids,
                'adults': party_booking.adults,
                'amount': float(party_booking.amount),
                'birthday_child_name': party_booking.birthday_child_name,
                'birthday_child_age': party_booking.birthday_child_age,
                'participants': party_booking.participants,
                'waiver_signed': party_booking.waiver_signed,
                'waiver_signed_at': party_booking.waiver_signed_at.isoformat() if party_booking.waiver_signed_at else None,
                'waiver_ip_address': party_booking.waiver_ip_address,
                'status': party_booking.status,
                'customer': party_booking.customer.id if party_booking.customer else None,
                'created_at': party_booking.created_at.isoformat(),
                'updated_at': party_booking.updated_at.isoformat(),
            }
            return Response(data)
        
        elif request.method == 'PATCH':
            # Update party booking fields
            update_data = request.data
            if 'status' in update_data:
                party_booking.status = update_data['status']
            if 'booking_status' in update_data:
                party_booking.status = update_data['booking_status']
            if 'name' in update_data:
                party_booking.name = update_data['name']
            if 'email' in update_data:
                party_booking.email = update_data['email']
            if 'phone' in update_data:
                party_booking.phone = update_data['phone']
            if 'date' in update_data:
                party_booking.date = update_data['date']
            if 'time' in update_data:
                party_booking.time = update_data['time']
            if 'amount' in update_data:
                party_booking.amount = update_data['amount']
            
            party_booking.save()
            
            return Response({
                'id': party_booking.id,
                'uuid': str(party_booking.uuid),
                'status': party_booking.status,
                'updated_at': party_booking.updated_at.isoformat(),
            })
        
        elif request.method == 'DELETE':
            party_booking.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
            
    except PartyBooking.DoesNotExist:
        return Response({'error': 'Party booking not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
