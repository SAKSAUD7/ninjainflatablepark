import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ninja_backend.settings")
django.setup()

from apps.cms.models import GroupPackage, GroupBenefit

def verify_groups():
    print("Verifying Groups Data...")
    
    packages = GroupPackage.objects.all()
    print(f"Group Packages: {packages.count()}")
    for pkg in packages:
        print(f"- {pkg.name} ({pkg.subtitle})")
        
    benefits = GroupBenefit.objects.all()
    print(f"Group Benefits: {benefits.count()}")
    for ben in benefits:
        print(f"- {ben.title}")

if __name__ == "__main__":
    verify_groups()
