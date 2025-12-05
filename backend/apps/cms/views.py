from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import (
    Banner, Activity, Faq, Testimonial, SocialLink, GalleryItem,
    StatCard, InstagramReel, MenuSection, GroupPackage, GuidelineCategory, LegalDocument,
    PageSection, PricingPlan, ContactInfo, PartyPackage, TimelineItem, ValueItem, FacilityItem,
    Page
)
from .serializers import (
    BannerSerializer, ActivitySerializer, FaqSerializer, TestimonialSerializer, 
    SocialLinkSerializer, GalleryItemSerializer,
    StatCardSerializer, InstagramReelSerializer, MenuSectionSerializer, GroupPackageSerializer,
    GuidelineCategorySerializer, LegalDocumentSerializer,
    PageSectionSerializer, PricingPlanSerializer, ContactInfoSerializer, PartyPackageSerializer,
    TimelineItemSerializer, ValueItemSerializer, FacilityItemSerializer,
    PageSerializer
)

class BaseCmsViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

class BannerViewSet(BaseCmsViewSet):
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer
    filterset_fields = ['active']
    ordering_fields = ['order', 'created_at']
    ordering = ['order']

class ActivityViewSet(BaseCmsViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filterset_fields = ['active']
    ordering_fields = ['order', 'created_at']
    ordering = ['order']

class FaqViewSet(BaseCmsViewSet):
    queryset = Faq.objects.all()
    serializer_class = FaqSerializer
    filterset_fields = ['active', 'category']
    ordering_fields = ['order']
    ordering = ['order']

class TestimonialViewSet(BaseCmsViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    filterset_fields = ['active', 'type']
    ordering_fields = ['created_at']
    ordering = ['-created_at']

class SocialLinkViewSet(BaseCmsViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer
    filterset_fields = ['active']
    ordering_fields = ['order']
    ordering = ['order']

class GalleryItemViewSet(BaseCmsViewSet):
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer
    filterset_fields = ['active', 'category']
    ordering_fields = ['order', 'created_at']
    ordering = ['order']

class StatCardViewSet(BaseCmsViewSet):
    queryset = StatCard.objects.all()
    serializer_class = StatCardSerializer
    filterset_fields = ['active', 'page']
    ordering_fields = ['order']
    ordering = ['page', 'order']

class InstagramReelViewSet(BaseCmsViewSet):
    queryset = InstagramReel.objects.all()
    serializer_class = InstagramReelSerializer
    filterset_fields = ['active']
    ordering_fields = ['order']
    ordering = ['order']

class MenuSectionViewSet(BaseCmsViewSet):
    queryset = MenuSection.objects.all()
    serializer_class = MenuSectionSerializer
    filterset_fields = ['active']
    ordering_fields = ['order']
    ordering = ['order']

class GroupPackageViewSet(BaseCmsViewSet):
    queryset = GroupPackage.objects.all()
    serializer_class = GroupPackageSerializer
    filterset_fields = ['active', 'popular']
    ordering_fields = ['order']
    ordering = ['order']

class GuidelineCategoryViewSet(BaseCmsViewSet):
    queryset = GuidelineCategory.objects.all()
    serializer_class = GuidelineCategorySerializer
    filterset_fields = ['active']
    ordering_fields = ['order']
    ordering = ['order']

class LegalDocumentViewSet(BaseCmsViewSet):
    queryset = LegalDocument.objects.all()
    serializer_class = LegalDocumentSerializer
    filterset_fields = ['active', 'document_type']
    lookup_field = 'document_type'

class PageSectionViewSet(BaseCmsViewSet):
    queryset = PageSection.objects.all()
    serializer_class = PageSectionSerializer
    filterset_fields = ['active', 'page', 'section_key']
    ordering_fields = ['order']
    ordering = ['page', 'order']

class PricingPlanViewSet(BaseCmsViewSet):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer
    filterset_fields = ['active', 'type', 'popular']
    ordering_fields = ['order']
    ordering = ['type', 'order']

class ContactInfoViewSet(BaseCmsViewSet):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
    filterset_fields = ['active', 'category']
    ordering_fields = ['order']
    ordering = ['category', 'order']

class PartyPackageViewSet(BaseCmsViewSet):
    queryset = PartyPackage.objects.all()
    serializer_class = PartyPackageSerializer
    filterset_fields = ['active', 'popular']
    ordering_fields = ['order']
    ordering = ['order']

class TimelineItemViewSet(BaseCmsViewSet):
    queryset = TimelineItem.objects.all()
    serializer_class = TimelineItemSerializer
    filterset_fields = ['active']
    ordering_fields = ['order']
    ordering = ['order']

class ValueItemViewSet(BaseCmsViewSet):
    queryset = ValueItem.objects.all()
    serializer_class = ValueItemSerializer
    filterset_fields = ['active']
    ordering_fields = ['order']
    ordering = ['order']

class FacilityItemViewSet(BaseCmsViewSet):
    queryset = FacilityItem.objects.all()
    serializer_class = FacilityItemSerializer
    filterset_fields = ['active']
    ordering_fields = ['order']
    ordering = ['order']

class PageViewSet(BaseCmsViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    filterset_fields = ['active', 'slug']
    lookup_field = 'slug'

class UploadView(APIView):
    permission_classes = [permissions.IsAdminUser]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # In a real production environment, you'd upload to S3/Cloudinary here.
        # For now, we'll assume the file is handled by Django's media storage 
        # or a separate upload handler if configured.
        # Since we don't have a dedicated Media model for generic uploads in this snippet,
        # we will simulate a successful upload response or use a temporary approach.
        
        # NOTE: To make this fully functional, we should ideally have a Media model 
        # or use default file storage and return the URL.
        # For this specific task, we will return a mock URL if no storage is configured,
        # or implement a simple file save if needed.
        
        # Let's assume we want to return a URL that the frontend can use.
        # If using standard Django FileSystemStorage:
        from django.core.files.storage import default_storage
        from django.core.files.base import ContentFile
        
        path = default_storage.save(f"uploads/{file_obj.name}", ContentFile(file_obj.read()))
        relative_url = default_storage.url(path)
        full_url = request.build_absolute_uri(relative_url)
        
        return Response({'url': full_url, 'filename': file_obj.name}, status=status.HTTP_201_CREATED)

class ReorderView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, *args, **kwargs):
        """
        Expects payload: { "model": "banner", "items": [{ "id": 1, "order": 0 }, { "id": 2, "order": 1 }] }
        """
        model_name = request.data.get('model')
        items = request.data.get('items', [])

        if not model_name or not items:
            return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

        # Map model name to actual model class
        model_map = {
            'banner': Banner,
            'activity': Activity,
            'faq': Faq,
            'testimonial': Testimonial,
            'social-link': SocialLink,
            'gallery-item': GalleryItem,
            'stat-card': StatCard,
            'instagram-reel': InstagramReel,
            'menu-section': MenuSection,
            'group-package': GroupPackage,
            'guideline-category': GuidelineCategory,
            'page-section': PageSection,
            'pricing-plan': PricingPlan,
            'contact-info': ContactInfo,
            'party-package': PartyPackage,
            'timeline-item': TimelineItem,
            'value-item': ValueItem,
            'facility-item': FacilityItem,
        }

        ModelClass = model_map.get(model_name)
        if not ModelClass:
            return Response({'error': f'Invalid model: {model_name}'}, status=status.HTTP_400_BAD_REQUEST)

        # Update orders
        for item in items:
            item_id = item.get('id')
            order = item.get('order')
            if item_id is not None and order is not None:
                ModelClass.objects.filter(id=item_id).update(order=order)

        return Response({'success': True})
