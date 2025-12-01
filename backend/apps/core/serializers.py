from rest_framework import serializers
from .models import User, GlobalSettings

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'profile_pic', 'role', 'is_active', 'last_login']
        read_only_fields = ['last_login']

class GlobalSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalSettings
        fields = '__all__'
