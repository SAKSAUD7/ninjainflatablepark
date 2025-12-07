import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.cms.models import (
    Page, Banner, Activity, Faq, Testimonial, SocialLink, GalleryItem,
    StatCard, InstagramReel, MenuSection, GroupPackage, GuidelineCategory,
    LegalDocument, PageSection, PricingPlan, ContactInfo, PartyPackage,
    TimelineItem, ValueItem, FacilityItem, GroupBenefit
)

models = [
    Page, Banner, Activity, Faq, Testimonial, SocialLink, GalleryItem,
    StatCard, InstagramReel, MenuSection, GroupPackage, GuidelineCategory,
    LegalDocument, PageSection, PricingPlan, ContactInfo, PartyPackage,
    TimelineItem, ValueItem, FacilityItem, GroupBenefit
]

print("Model Counts:")
for model in models:
    count = model.objects.count()
    print(f"{model.__name__}: {count}")
    if count > 0:
        print(f"  Sample: {model.objects.first()}")
