#!/usr/bin/env python
"""
Add party_availability field to GlobalSettings
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.core.models import GlobalSettings

# Get or create settings
settings, created = GlobalSettings.objects.get_or_create(id=1)

# Add party availability if not exists
if not hasattr(settings, 'party_availability') or not settings.party_availability:
    settings.party_availability = "Thursday - Sunday"
    settings.save()
    print(f"✅ Added party_availability: {settings.party_availability}")
else:
    print(f"✅ Party availability already set: {settings.party_availability}")

print(f"\n📍 Settings ID: {settings.id}")
print(f"📍 Edit in Django Admin: http://localhost:8000/admin/core/globalsettings/{settings.id}/change/")
