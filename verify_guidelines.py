import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from apps.cms.models import GuidelineCategory, LegalDocument

def verify_data():
    categories = GuidelineCategory.objects.all()
    print(f"Categories count: {categories.count()}")
    for cat in categories:
        print(f"- {cat.title}")

    docs = LegalDocument.objects.all()
    print(f"Legal Documents count: {docs.count()}")
    for doc in docs:
        print(f"- {doc.get_document_type_display()}: {doc.title}")

if __name__ == "__main__":
    verify_data()
