from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BannerViewSet, ActivityViewSet, FaqViewSet, 
    TestimonialViewSet, StaticPageViewSet, SocialLinkViewSet, GalleryItemViewSet, FreeEntryViewSet
)

router = DefaultRouter()
router.register(r'banners', BannerViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'faqs', FaqViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'pages', StaticPageViewSet)
router.register(r'social-links', SocialLinkViewSet)
router.register(r'gallery', GalleryItemViewSet)
router.register(r'free-entries', FreeEntryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
