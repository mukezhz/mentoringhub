from django.contrib import admin
from .models import Mentorship

# Register your models here.
@admin.register(Mentorship)
class MentorshipAdmin(admin.ModelAdmin):
    pass