from django.db import models

# Create your models here.
class Mentorship(models.Model):
    PENDING = "PENDING"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"
    STATUS_CHOICES = (
        (PENDING, ("PENDING")),
        (ACCEPTED, ("ACCEPTED")),
        (REJECTED, ("REJECTED")),
    )
    title = models.CharField(max_length=50, null=True)
    qna = models.JSONField(null=True)
    mentor_id = models.CharField(max_length=100)
    mentee_id = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=PENDING)
    available = models.DateTimeField(null=True)
    available_hour = models.IntegerField(null=True)

    def __str__(self):
        return f"{self.mentee_id} -> {self.mentor_id}"
