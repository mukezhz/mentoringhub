from django.db import models

# Create your models here.
class Mentorship(models.Model):
    title = models.CharField(max_length=50, null=True)
    qna = models.JSONField(null=True)
    mentor_id = models.CharField(max_length=100)
    mentee_id = models.CharField(max_length=100)
    status = models.CharField(
        max_length=10,
        default="PENDING",
    )
    available = models.DateTimeField(null=True)
    available_hour = models.CharField(max_length=15, null=True)

    def __str__(self):
        return f"{self.mentee_id} -> {self.mentor_id}"
