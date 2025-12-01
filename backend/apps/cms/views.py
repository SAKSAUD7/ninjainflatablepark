from rest_framework import viewsets, permissions
from .models import Banner, Activity, Faq, Testimonial, StaticPage, SocialLink, GalleryItem, FreeEntry
from .serializers import (
    BannerSerializer, ActivitySerializer, FaqSerializer, 
    TestimonialSerializer, StaticPageSerializer, SocialLinkSerializer, GalleryItemSerializer, FreeEntrySerializer
)

class BaseCmsViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

class BannerViewSet(BaseCmsViewSet):
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer

class ActivityViewSet(BaseCmsViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class FaqViewSet(BaseCmsViewSet):
    queryset = Faq.objects.all()
    serializer_class = FaqSerializer

class TestimonialViewSet(BaseCmsViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

class StaticPageViewSet(BaseCmsViewSet):
    queryset = StaticPage.objects.all()
    serializer_class = StaticPageSerializer
    lookup_field = 'slug'

class SocialLinkViewSet(BaseCmsViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer

class GalleryItemViewSet(BaseCmsViewSet):
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer

class FreeEntryViewSet(viewsets.ModelViewSet):
    queryset = FreeEntry.objects.all()
    serializer_class = FreeEntrySerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
