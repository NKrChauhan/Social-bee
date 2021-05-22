from django.db import models
from .models import User
from django import forms


class UserAdminForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['email', 'username', 'password',
                  'profile_picture', 'gender', 'active', 'admin', 'staff']
