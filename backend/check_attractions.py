#!/usr/bin/env python
"""
Quick check of Activities (Attractions) in database
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.cms.models import Activity

print("=" * 70)
print("🎯 ATTRACTIONS/ACTIVITIES IN DATABASE")
print("=" * 70)
print()

activities = Activity.objects.all().order_by('order')
print(f"Total Activities: {activities.count()}")
print()

if activities.count() > 0:
    print("List of Attractions:")
    print("-" * 70)
    for activity in activities:
        print(f"\n{activity.order}. {activity.name}")
        print(f"   Slug: {activity.slug}")
        print(f"   Description: {activity.description[:60]}...")
        print(f"   Image: {activity.image_url}")
        print(f"   Active: {activity.active}")
else:
    print("⚠️ NO ACTIVITIES FOUND IN DATABASE!")
    print("\nRun: python populate_all_data.py")

print()
print("=" * 70)
print("\n📍 Django Admin Location:")
print("   http://localhost:8000/admin/cms/activity/")
print()
print("📍 Frontend Attractions Page:")
print("   http://localhost:5000/attractions")
print()
