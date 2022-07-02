from graphene import ObjectType, List
from .types import UserProfileType, UserInterestType, UserSkillType
from ..models import UserProfile, UserInterest, UserSkill


class UserProfileQuery(ObjectType):
    """
    user profile query
    """

    user_profiles = List(UserProfileType)

    def resolve_user_profiles(root, info, **kwargs):
        return UserProfile.objects.all()


class UserInterestQuery(ObjectType):
    """
    user interest query
    """

    user_interests = List(UserInterestType)

    def resolve_user_interests(root, info, **kwargs):
        return UserInterest.objects.all()


class UserSkillQuery(ObjectType):
    """
    user skill query
    """

    user_skills = List(UserSkillType)

    def resolve_user_skills(root, info, **kwargs):
        return UserSkill.objects.all()
