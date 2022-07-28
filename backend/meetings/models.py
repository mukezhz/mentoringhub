import imp
import black
from django.db import models
from django_countries.fields import CountryField
from users.models import CustomUser
from datetime import datetime

# Create your models here.
class Meeting(models.Model):
    NEW = "NEW"
    CANCELED = "CANCELED"
    ENDED = "ENDED"
    STATUS_CHOICES = (
        (NEW, ("NEW")),
        (CANCELED, ("CANCELED")),
        (ENDED, ("ENDED")),
    )
    room = models.CharField(max_length=100, null=False)
    title = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=500, null=True)
    participants = models.JSONField(null=True)
    start_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    cover_image = models.ImageField(upload_to="uploads/% Y/% m/% d/", null=True, blank=True)
    country = CountryField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    token = models.CharField(max_length=256)
    users = models.ForeignKey(to=CustomUser, on_delete=models.DO_NOTHING)

    def __str__(self) -> str:
        return f"{self.room} {self.country}"
