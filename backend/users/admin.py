"""Registering customuser into admin."""
from django.contrib import admin
from .models import CustomUser, UserProfile, UserInterest, UserSkill

@admin.register(CustomUser)
class CustomUserAdminModel(admin.ModelAdmin):
    pass

@admin.register(UserProfile)
class UserProfileAdminModel(admin.ModelAdmin):
    pass

@admin.register(UserInterest)
class UserInterestAdminModel(admin.ModelAdmin):
    pass

@admin.register(UserSkill)
class UserSkillAdminModel(admin.ModelAdmin):
    pass
