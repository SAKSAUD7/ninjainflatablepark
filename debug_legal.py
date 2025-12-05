import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from apps.cms.models import LegalDocument

def debug_legal_docs():
    print("Debugging Legal Documents...")
    
    # Try to clean up first to avoid unique constraint issues if any partially exist
    # LegalDocument.objects.all().delete()
    
    terms_sections = [
        {"title": "Test Section", "content": "Test Content"}
    ]

    try:
        doc, created = LegalDocument.objects.update_or_create(
            document_type="TERMS",
            defaults={
                "title": "Terms & Conditions",
                "intro": "Test Intro",
                "sections": terms_sections,
                "active": True
            }
        )
        print(f"Success! Created: {created}, Doc: {doc}")
    except Exception as e:
        print(f"Error creating TERMS: {e}")

    # Check count
    print(f"Total LegalDocs: {LegalDocument.objects.count()}")

if __name__ == "__main__":
    debug_legal_docs()
