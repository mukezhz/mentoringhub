"""Registering customuser into admin."""
from django.contrib import admin
from .models import CustomUser, UserProfile, UserInterest, UserSkill

# Register your models here. admin.site.register(CustomUser)
admin.site.register(CustomUser)
admin.site.register(UserProfile)
admin.site.register(UserInterest)
admin.site.register(UserSkill)