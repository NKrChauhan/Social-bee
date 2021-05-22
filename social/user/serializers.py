from django.core.exceptions import ValidationError
from django.db.models import fields
from rest_framework import serializers
from .models import User


class UserSerializerLogin(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()


class UserSerializerRegister(serializers.ModelSerializer):
    re_password = serializers.CharField()

    class Meta:
        model = User
        fields = ['email', 'username', 'password']

    def validate_password(self, value):
        if value != self.re_password:
            raise ValidationError("the password doesn't match during register")
        return value
