#!/usr/bin/env python
"""
Verification script to check all populated content in the database.
"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.cms.models import (
    PageSection, StatCard, TimelineItem, ValueItem, InstagramReel,
    GalleryItem, ContactInfo, PricingPlan, Activity, PartyPackage,
    GroupPackage, GuidelineCategory, FacilityItem
)
from apps.core.models import GlobalSettings

def verify_content():
    """Verify all content exists in database"""
    print("=" * 60)
    print("🔍 CONTENT VERIFICATION REPORT")
    print("=" * 60)
    print()
    
    # Check each model
    models_to_check = [
        ('PageSection', PageSection),
        ('StatCard', StatCard),
        ('TimelineItem', TimelineItem),
        ('ValueItem', ValueItem),
        ('InstagramReel', InstagramReel),
        ('GalleryItem', GalleryItem),
        ('ContactInfo', ContactInfo),
        ('PricingPlan', PricingPlan),
        ('Activity', Activity),
        ('PartyPackage', PartyPackage),
        ('GroupPackage', GroupPackage),
        ('GuidelineCategory', GuidelineCategory),
        ('FacilityItem', FacilityItem),
        ('GlobalSettings', GlobalSettings),
    ]
    
    for model_name, model_class in models_to_check:
        count = model_class.objects.count()
        status = "✅" if count > 0 else "⚠️"
        print(f"{status} {model_name}: {count} records")
        
        # Show details for key models
        if model_name == 'PageSection' and count > 0:
            print("   Pages with sections:")
            for page in PageSection.objects.values_list('page', flat=True).distinct():
                sections = PageSection.objects.filter(page=page).count()
                print(f"     • {page}: {sections} sections")
        
        elif model_name == 'StatCard' and count > 0:
            print("   Stats by page:")
            for page in StatCard.objects.values_list('page', flat=True).distinct():
                stats = StatCard.objects.filter(page=page).count()
                print(f"     • {page}: {stats} stats")
    
    print()
    print("=" * 60)
    
    # Detailed PageSection breakdown
    print("\n📋 DETAILED PAGE SECTIONS:")
    print("-" * 60)
    for section in PageSection.objects.all().order_by('page', 'order'):
        print(f"  {section.page} → {section.section_key}")
        if section.title:
            print(f"    Title: {section.title[:50]}...")
        if section.content:
            content_preview = section.content[:80].replace('\n', ' ')
            print(f"    Content: {content_preview}...")
    
    print()
    print("=" * 60)
    print("✅ VERIFICATION COMPLETE")
    print("=" * 60)

if __name__ == '__main__':
    verify_content()
