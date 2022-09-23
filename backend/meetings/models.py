from django.db import models
from django_countries.fields import CountryField
from users.models import CustomUser

# Create your models here.
class Meeting(models.Model):
    room = models.CharField(max_length=100, null=False)
    title = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=500, null=True)
    participants = models.JSONField(null=True)
    status = models.CharField(max_length=10, null=True)
    cover_image = models.ImageField(
        upload_to="uploads/% Y/% m/% d/", null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    users = models.ForeignKey(to=CustomUser, on_delete=models.DO_NOTHING)

    def __str__(self) -> str:
        return f"{self.room}"
