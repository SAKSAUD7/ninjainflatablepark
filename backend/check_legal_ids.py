#!/usr/bin/env python
"""
Check what IDs the legal documents have in the database
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.cms.models import LegalDocument

print("=" * 70)
print("🔍 LEGAL DOCUMENTS IDs IN DATABASE")
print("=" * 70)

docs = LegalDocument.objects.all()
print(f"\nTotal: {docs.count()} documents\n")

for doc in docs:
    print(f"ID: {doc.id}")
    print(f"  Type: {doc.document_type}")
    print(f"  Title: {doc.title}")
    print(f"  Sections: {len(doc.sections)}")
    print()

print("=" * 70)
print("\n📍 To edit in custom admin, use these URLs:")
for doc in docs:
    print(f"  http://localhost:5000/admin/cms/legal-documents/{doc.id}")
print()
