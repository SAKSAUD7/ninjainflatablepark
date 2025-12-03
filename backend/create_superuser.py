#!/usr/bin/env python
"""
Script to create a superuser for the Django backend
"""
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ninja_backend.settings')
django.setup()

from apps.core.models import User

def create_superuser():
    email = 'superadmin@ninjapark.com'
    password = 'SuperAdmin@2024'
    name = 'Super Admin'
    username = 'superadmin'
    
    # Check if user already exists
    if User.objects.filter(email=email).exists():
        print(f"✅ User with email {email} already exists!")
        user = User.objects.get(email=email)
        # Update to ensure superuser status
        user.is_superuser = True
        user.is_staff = True
        user.role = 'SUPER_ADMIN'
        user.set_password(password)
        user.save()
        print(f"✅ Updated existing user to superuser with new password")
    else:
        # Create new superuser
        user = User.objects.create_superuser(
            email=email,
            username=username,
            name=name,
            password=password
        )
        user.role = 'SUPER_ADMIN'
        user.save()
        print(f"✅ Created new superuser: {email}")
    
    print("\n" + "="*50)
    print("🔑 SUPERADMIN CREDENTIALS")
    print("="*50)
    print(f"Email:    {email}")
    print(f"Password: {password}")
    print(f"Role:     {user.role}")
    print("="*50)
    print("\n✅ You can now login at:")
    print("   - Frontend Admin: http://localhost:5000/admin")
    print("   - Django Admin:   http://localhost:8000/admin")
    print("\n")

if __name__ == '__main__':
    create_superuser()
