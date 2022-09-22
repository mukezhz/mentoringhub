from dataclasses import Field
from graphene import ObjectType, List, Field, String
from graphql_jwt.decorators import login_required
from .types import UserProfileType, UserInterestType, UserSkillType
from ..models import CustomUser, UserProfile, UserInterest, UserSkill


class UserProfileQuery(ObjectType):
    """
    user profile query for all
    """

    fetch_profiles = List(UserProfileType)
    fetch_profile_according_to_role = List(UserProfileType, role=String(required=True))
    fetch_your_profile = Field(UserProfileType)
    fetch_profile_according_to_username = Field(
        UserProfileType, username=String(required=True)
    )

    @login_required
    def resolve_fetch_profiles(root, info, **kwargs):
        return UserProfile.objects.all()

    # @login_required
    def resolve_fetch_profile_according_to_role(root, info, **kwargs):
        role = kwargs.get("role") or ""
        try:
            profiles = UserProfile.objects.filter(role=role.lower())
            return profiles
        except UserProfile.DoesNotExist:
            return None

    # @login_required
    def resolve_fetch_profile_according_to_username(root, info, **kwargs):
        username = kwargs.get("username") or ""
        try:
            user = CustomUser.objects.get(username=username)
            profile = UserProfile.objects.get(user=user)
            return profile
        except UserProfile.DoesNotExist:
            return None

    @login_required
    def resolve_fetch_your_profile(root, info, **kwargs):
        user = info.context.user
        try:
            # profile = UserProfile.objects.get(user=user)
            return user.userprofile
        except UserProfile.DoesNotExist:
            return None


class UserInterestQuery(ObjectType):
    """
    user interest query
    """

    fetch_all_user_interests = List(UserInterestType)
    fetch_your_interests = List(
        UserInterestType,
    )

    def resolve_fetch_all_user_interests(root, info, **kwargs):
        return UserInterest.objects.all()

    @login_required
    def resolve_fetch_your_interests(root, info, **kwargs):
        user = info.context.user
        try:
            profile = UserProfile.objects.get(user=user)
            interest = UserInterest.objects.get(userprofile=profile)
            return interest
        except UserProfile.DoesNotExist or UserInterest.DoesNotExist:
            return None
        except:
            return None


class UserSkillQuery(ObjectType):
    """
    user skill query
    """

    fetch_all_user_skills = List(UserSkillType)
    fetch_your_skills = List(
        UserSkillType,
    )

    def resolve_fetch_all_user_skills(root, info, **kwargs):
        return UserSkill.objects.all()

    @login_required
    def resolve_fetch_your_skills(root, info, **kwargs):
        user = info.context.user
        try:
            profile = UserProfile.objects.get(user=user)
            interest = UserSkill.objects.get(userprofile=profile)
            return interest
        except UserProfile.DoesNotExist or UserSkill.DoesNotExist:
            return None
        except:
            return None
