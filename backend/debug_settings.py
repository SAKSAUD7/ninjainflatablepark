import os
import django
import sys

sys.path.append(os.getcwd())
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from django.conf import settings

print(f"DEBUG TYPE: {type(settings.DEBUG)}")
print(f"DEBUG VALUE: {settings.DEBUG}")
print(f"ALLOWED_HOSTS TYPE: {type(settings.ALLOWED_HOSTS)}")
print(f"ALLOWED_HOSTS VALUE: {settings.ALLOWED_HOSTS}")
