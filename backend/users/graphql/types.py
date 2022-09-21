from graphene_django import DjangoObjectType
from ..models import CustomUser, UserProfile, UserInterest, UserSkill


class CustomUserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = (
            "username",
            "email",
        )


class UserInterestType(DjangoObjectType):
    class Meta:
        model = UserInterest
        fileds = ("interest", "domain")


class UserSkillType(DjangoObjectType):
    class Meta:
        model = UserSkill
        fileds = ("skill", "domain")


class UserProfileType(DjangoObjectType):
    def resolve_photo(self, info):
        """Resolve product photo absolute path"""
        if self.photo:
            self.photo = info.context.build_absolute_uri(self.photo.url)
        return self.photo

    class Meta:
        model = UserProfile
        fields = (
            "user",
            "date_of_birth",
            "address",
            "city",
            "country",
            "gender",
            "mobile_phone",
            "role",
            "profession",
            "full_name",
            "userinterest",
            "userskill",
        )
