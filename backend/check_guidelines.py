#!/usr/bin/env python
"""
Check current guidelines data and add legal documents
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.cms.models import GuidelineCategory, LegalDocument

print("=" * 70)
print("🔍 CURRENT GUIDELINES DATA")
print("=" * 70)

print("\n📋 GuidelineCategories:")
categories = GuidelineCategory.objects.all().order_by('order')
print(f"Total: {categories.count()}")
for cat in categories:
    print(f"  • {cat.title}: {len(cat.items)} items")

print("\n📄 LegalDocuments:")
docs = LegalDocument.objects.all()
print(f"Total: {docs.count()}")
for doc in docs:
    print(f"  • {doc.document_type}: {doc.title}")

print("\n" + "=" * 70)
