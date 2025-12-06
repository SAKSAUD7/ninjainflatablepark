
import os
import sys
import django

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from apps.cms.models import ContactMessage

with open("verify_result.txt", "w", encoding="utf-8") as f:
    f.write("-" * 50 + "\n")
    count = ContactMessage.objects.count()
    f.write(f"Total Messages: {count}\n")
    f.write("-" * 50 + "\n")

    last_3 = ContactMessage.objects.all().order_by('-created_at')[:3]
    for msg in last_3:
        f.write(f"Name: {msg.name}\n")
        f.write(f"Email: {msg.email}\n")
        f.write(f"Message: {msg.message}\n")
        f.write(f"Created: {msg.created_at}\n")
        f.write("-" * 50 + "\n")
