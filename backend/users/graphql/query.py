from dataclasses import Field
from graphene import ObjectType, List, Field
from graphql_jwt.decorators import login_required
from .types import UserProfileType, UserInterestType, UserSkillType
from ..models import UserProfile, UserInterest, UserSkill


class UserProfileQuery(ObjectType):
    """
    user profile query fpr all
    """

    user_profiles = List(UserProfileType)

    @login_required
    def resolve_user_profiles(root, info, **kwargs):
        return UserProfile.objects.all()

class UserProfileOneQuery(ObjectType):
    """
    quer user profile for a single user
    """
    user_profile = Field(UserProfile)

    @login_required
    def resolve_user_profile(root, info, **kwargs):
        user = info.context.user
        try:
            profile = UserProfile.objects.get(user=user)
            return profile
        except UserProfile.DoesNotExist:
            return None


class UserInterestQuery(ObjectType):
    """
    user interest query
    """

    user_interests = List(UserInterestType)

    def resolve_user_interests(root, info, **kwargs):
        return UserInterest.objects.all()


class UserInterestOneQuery(ObjectType):
    """
    quer user profile for a single user
    """
    user_interest = Field(UserProfile)

    @login_required
    def resolve_user_interest(root, info, **kwargs):
        user = info.context.user
        try:
            profile = UserProfile.objects.get(user=user)
            return profile
        except UserProfile.DoesNotExist:
            return None

class UserSkillQuery(ObjectType):
    """
    user skill query
    """

    user_skills = List(UserSkillType)

    def resolve_user_skills(root, info, **kwargs):
        return UserSkill.objects.all()
