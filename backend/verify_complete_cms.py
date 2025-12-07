#!/usr/bin/env python
"""
Comprehensive verification script to check ALL CMS models
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.cms.models import (
    Page, Banner, Activity, Faq, Testimonial, SocialLink, GalleryItem,
    StatCard, InstagramReel, MenuSection, GroupPackage, GuidelineCategory,
    LegalDocument, PageSection, PricingPlan, ContactInfo, PartyPackage,
    TimelineItem, ValueItem, FacilityItem, GroupBenefit, ContactMessage
)
from apps.core.models import GlobalSettings

def check_model(model_class, model_name):
    """Check if model has data"""
    count = model_class.objects.count()
    status = "✅" if count > 0 else "⚠️ EMPTY"
    print(f"{status} {model_name}: {count} records")
    
    if count > 0 and count <= 5:
        print(f"   Sample records:")
        for obj in model_class.objects.all()[:3]:
            print(f"     • {str(obj)[:60]}")
    
    return count

def main():
    print("=" * 70)
    print("🔍 COMPLETE CMS DATABASE VERIFICATION")
    print("=" * 70)
    print()
    
    models_to_check = [
        (Page, "Page"),
        (PageSection, "PageSection"),
        (Banner, "Banner"),
        (Activity, "Activity"),
        (Faq, "Faq"),
        (Testimonial, "Testimonial"),
        (SocialLink, "SocialLink"),
        (GalleryItem, "GalleryItem"),
        (StatCard, "StatCard"),
        (InstagramReel, "InstagramReel"),
        (MenuSection, "MenuSection"),
        (GroupPackage, "GroupPackage"),
        (GuidelineCategory, "GuidelineCategory"),
        (LegalDocument, "LegalDocument"),
        (PricingPlan, "PricingPlan"),
        (ContactInfo, "ContactInfo"),
        (PartyPackage, "PartyPackage"),
        (TimelineItem, "TimelineItem"),
        (ValueItem, "ValueItem"),
        (FacilityItem, "FacilityItem"),
        (GroupBenefit, "GroupBenefit"),
        (ContactMessage, "ContactMessage"),
        (GlobalSettings, "GlobalSettings"),
    ]
    
    total_records = 0
    empty_models = []
    
    for model_class, model_name in models_to_check:
        count = check_model(model_class, model_name)
        total_records += count
        if count == 0:
            empty_models.append(model_name)
        print()
    
    print("=" * 70)
    print("📊 SUMMARY")
    print("=" * 70)
    print(f"Total Records: {total_records}")
    print(f"Models with Data: {len(models_to_check) - len(empty_models)}/{len(models_to_check)}")
    
    if empty_models:
        print(f"\n⚠️ Empty Models ({len(empty_models)}):")
        for model in empty_models:
            print(f"  • {model}")
    else:
        print("\n✅ ALL MODELS HAVE DATA!")
    
    print()
    print("=" * 70)
    print("📄 PAGE SECTIONS BY PAGE:")
    print("=" * 70)
    pages = PageSection.objects.values_list('page', flat=True).distinct()
    for page in pages:
        sections = PageSection.objects.filter(page=page).order_by('order')
        print(f"\n{page.upper()}:")
        for section in sections:
            print(f"  • {section.section_key}: {section.title or '(no title)'}")
    
    print()
    print("=" * 70)

if __name__ == '__main__':
    main()
