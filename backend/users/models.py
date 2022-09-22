"""Users related models."""

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django_countries.fields import CountryField


class CustomUser(AbstractUser):
    """
    Actual user model for authentication.
    Added email field so that user can be authenticated
    using Email as well as Username.
    """

    email = models.EmailField(blank=False, max_length=254, verbose_name="email address")
    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"


class UserProfile(models.Model):
    """
    UserProfile model.

    All other features of user are added here.
    """

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=256, blank=False, null=False)
    date_of_birth = models.DateField(
        verbose_name="Date of birth", blank=True, null=True
    )
    address = models.CharField(
        verbose_name="Current Addres", max_length=256, blank=True, null=True
    )
    zip_code = models.CharField(
        verbose_name=("Postal Code"), max_length=12, blank=True, null=True
    )
    city = models.CharField(
        verbose_name=("City"), max_length=256, blank=True, null=True
    )
    country = CountryField(blank=True, null=True)

    GENDER_CHOICES = (
        ("MALE", ("male")),
        ("FEMALE", ("female")),
        ("OTHER", ("other")),
    )
    gender = models.CharField(
        verbose_name="Enter your gender",
        max_length=10,
        blank=True,
        null=True,
        choices=GENDER_CHOICES,
    )

    phone_regex = RegexValidator(
        regex=r"^\+(?:[0-9]●?){6,14}[0-9]$",
        message=("Enter a valid mobile phone number starting with +(country code)"),
    )
    mobile_phone = models.CharField(
        validators=[phone_regex],
        verbose_name=("Mobile phone"),
        max_length=17,
        blank=True,
        null=True,
    )
    about_user = models.CharField(
        verbose_name=("Additional information about user"),
        max_length=4096,
        blank=True,
        null=True,
    )
    photo = (
        models.ImageField(
            verbose_name=("Photo"),
            upload_to="profile/",
            default=None,
        ),
    )

    USER_CHOICES = (
        ("MENTOR", ("mentor")),
        ("MENTEE", ("mentee")),
    )
    role = models.CharField(
        verbose_name="Role of user", choices=USER_CHOICES, max_length=10
    )
    profession = models.CharField(verbose_name="User's Profession", max_length=50)

    login_method = models.CharField(
        verbose_name="How user created their account", max_length=50, default="email"
    )
    languages = models.JSONField(null=True, verbose_name="languages")
    interests = models.JSONField(verbose_name="User Interests", null=True, blank=True)
    skills = models.JSONField(verbose_name="User Skills", null=True, blank=True)

    def __str__(self):
        """Return username of authenticated user."""
        return self.user.username


class UserInterest(models.Model):
    userprofile = models.OneToOneField(
        to=UserProfile, on_delete=models.CASCADE, null=True, blank=True
    )
    interest = models.JSONField(verbose_name="User Interests", null=True, blank=True)
    domain = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.userprofile.user.username


class UserSkill(models.Model):
    userprofile = models.OneToOneField(
        to=UserProfile, on_delete=models.CASCADE, null=True, blank=True
    )
    skill = models.JSONField(verbose_name="User Skills", null=True, blank=True)
    domain = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.userprofile.user.username
