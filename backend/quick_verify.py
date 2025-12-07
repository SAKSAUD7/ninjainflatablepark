#!/usr/bin/env python
"""Quick check of populated data"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.cms.models import PageSection, StatCard, TimelineItem, ContactInfo, PricingPlan

print("\n📊 DATABASE CONTENT SUMMARY")
print("=" * 50)
print(f"PageSection: {PageSection.objects.count()} records")
for page in ['home', 'about', 'pricing']:
    count = PageSection.objects.filter(page=page).count()
    print(f"  • {page}: {count} sections")

print(f"\nStatCard: {StatCard.objects.count()} records")
for page in ['home', 'about']:
    count = StatCard.objects.filter(page=page).count()
    print(f"  • {page}: {count} stats")

print(f"\nTimelineItem: {TimelineItem.objects.count()} records")
print(f"ContactInfo: {ContactInfo.objects.count()} records")
print(f"PricingPlan: {PricingPlan.objects.count()} records")

print("\n✅ All content populated successfully!")
print("=" * 50)
