#!/usr/bin/env python
"""
Safe verification - only checks models with existing tables
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.cms.models import (
    Page, PageSection, Activity, Faq, GalleryItem,
    StatCard, GroupPackage, GuidelineCategory,
    PricingPlan, ContactInfo, PartyPackage,
    TimelineItem, ValueItem, FacilityItem, GroupBenefit
)
from apps.core.models import GlobalSettings

def safe_check(model_class, model_name):
    """Safely check model"""
    try:
        count = model_class.objects.count()
        status = "✅" if count > 0 else "⚠️ EMPTY"
        print(f"{status} {model_name}: {count} records")
        return count, True
    except Exception as e:
        print(f"❌ {model_name}: Table doesn't exist or error")
        return 0, False

def main():
    print("=" * 70)
    print("🔍 CMS DATABASE VERIFICATION (Safe Mode)")
    print("=" * 70)
    print()
    
    models = [
        (Page, "Page"),
        (PageSection, "PageSection"),
        (Activity, "Activity/Attractions"),
        (Faq, "FAQ"),
        (GalleryItem, "GalleryItem"),
        (StatCard, "StatCard"),
        (GroupPackage, "GroupPackage"),
        (GuidelineCategory, "GuidelineCategory"),
        (PricingPlan, "PricingPlan"),
        (ContactInfo, "ContactInfo"),
        (PartyPackage, "PartyPackage"),
        (TimelineItem, "TimelineItem"),
        (ValueItem, "ValueItem"),
        (FacilityItem, "FacilityItem"),
        (GroupBenefit, "GroupBenefit"),
        (GlobalSettings, "GlobalSettings"),
    ]
    
    total = 0
    working = 0
    
    for model_class, name in models:
        count, success = safe_check(model_class, name)
        total += count
        if success:
            working += 1
        print()
    
    print("=" * 70)
    print(f"📊 Total Records: {total}")
    print(f"📊 Working Models: {working}/{len(models)}")
    print("=" * 70)
    
    # Show page sections detail
    print("\n📄 PAGE SECTIONS DETAIL:")
    print("-" * 70)
    try:
        pages = PageSection.objects.values_list('page', flat=True).distinct()
        for page in pages:
            sections = PageSection.objects.filter(page=page).count()
            print(f"  {page}: {sections} sections")
            for sec in PageSection.objects.filter(page=page).order_by('order'):
                print(f"    • {sec.section_key}: {sec.title or '(content only)'}")
    except:
        print("  Error loading page sections")
    
    print("\n" + "=" * 70)

if __name__ == '__main__':
    main()
