from datetime import datetime
from time import clock_getres
from urllib import request
from django.core.exceptions import ObjectDoesNotExist, PermissionDenied
from graphene import ObjectType, Mutation, Boolean, JSONString, String
from graphql_auth import mutations
from graphql_jwt.decorators import login_required

# from .types import CustomUserType
from ..models import UserProfile, UserInterest, UserSkill


class AuthMutation(ObjectType):
    """
    Creating GraphQl Datatype for mutation.

    For more info see django auth graphql.
    """

    register = mutations.Register.Field()
    verify_account = mutations.VerifyAccount.Field()
    resend_activation_email = mutations.ResendActivationEmail.Field()
    send_password_reset_email = mutations.SendPasswordResetEmail.Field()
    password_reset = mutations.PasswordReset.Field()
    password_change = mutations.PasswordChange.Field()
    archive_account = mutations.ArchiveAccount.Field()
    delete_account = mutations.DeleteAccount.Field()
    update_account = mutations.UpdateAccount.Field()
    send_secondary_email_activation = mutations.SendSecondaryEmailActivation.Field()
    verify_secondary_email = mutations.VerifySecondaryEmail.Field()
    swap_emails = mutations.SwapEmails.Field()

    # django-graphql-jwt authentication
    # with some extra features
    token_auth = mutations.ObtainJSONWebToken.Field()
    verify_token = mutations.VerifyToken.Field()
    refresh_token = mutations.RefreshToken.Field()
    revoke_token = mutations.RevokeToken.Field()


class CreateUserProfile(Mutation):
    """Mutation for UserProfile."""

    class Arguments:
        date_of_birth = String(required=False)
        address = String(required=False)
        city = String(required=False)
        country = String(required=False)
        gender = String(required=False)
        mobile_phone = String(required=False)
        role = String(required=True)
        profession = String(required=True)
        full_name = String(required=True)
        mobile_phone = String(required=True)
        about_user = String(required=True)
        languages = JSONString(required=True)
        interests = JSONString(required=True)
        skills = JSONString(required=True)

    success = Boolean()
    msg = String()
    # custom_user = Field(CustomUserType)
    # @login_required
    def mutate(root, info, **kwargs):
        # if info.context.user is not
        try:
            if not info.context.user.is_authenticated:
                raise PermissionDenied
            user = info.context.user
            date_of_birth = kwargs.get("date_of_birth")
            address = kwargs.get("address")
            full_name = kwargs.get("full_name")
            city = kwargs.get("city")
            country = kwargs.get("country")
            gender = kwargs.get("gender")
            mobile_phone = kwargs.get("mobile_phone")
            role = kwargs.get("role")
            profession = kwargs.get("profession")
            mobile_phone = kwargs.get("mobile_phone")
            about_user = kwargs.get("about_user")
            languages = kwargs.get("languages")
            interests = kwargs.get("interests")
            skills = kwargs.get("skills")
            print(languages, interests, skills)
            u, created = UserProfile.objects.get_or_create(user=user)
            if not created:
                return CreateUserProfile(success=False, msg="Profile Already Created")
            print(type(skills))
            u.date_of_birth = datetime.fromtimestamp(int(date_of_birth) / 1000)
            u.address = address
            u.city = city
            u.country = country
            u.gender = gender
            u.mobile_phone = mobile_phone
            u.role = role
            u.profession = profession
            u.full_name = full_name
            u.mobile_phone = mobile_phone
            u.about_user = about_user
            u.languages = languages
            u.interests = interests
            u.skills = skills
            u.save()
            return CreateUserProfile(success=True, msg="Profile Created")
        except ObjectDoesNotExist:
            return CreateUserProfile(success=False, msg="Object doesn't exist")
        except PermissionDenied:
            return CreateUserProfile(success=False, msg="User is not authenticated")
        except Exception as e:
            print(e)
            return CreateUserProfile(success=False, msg="Other error")


class UpdateUserProfile(Mutation):
    """Update for UserProfile."""

    class Arguments:
        date_of_birth = String(required=False)
        address = String(required=False)
        city = String(required=False)
        country = String(required=False)
        gender = String(required=False)
        mobile_phone = String(required=False)
        role = String(required=True)
        profession = String(required=True)
        full_name = String(required=True)
        about_user = String(required=True)
        languages = JSONString(required=True)
        interests = JSONString(required=True)
        skills = JSONString(required=True)

    success = Boolean()
    msg = String()
    # custom_user = Field(CustomUserType)
    # @login_required
    def mutate(root, info, **kwargs):
        # if info.context.user is not
        try:
            if not info.context.user.is_authenticated:
                raise PermissionDenied
            user = info.context.user
            date_of_birth = kwargs.get("date_of_birth")
            address = kwargs.get("address")
            full_name = kwargs.get("full_name")
            city = kwargs.get("city")
            country = kwargs.get("country")
            gender = kwargs.get("gender")
            mobile_phone = kwargs.get("mobile_phone")
            role = kwargs.get("role")
            profession = kwargs.get("profession")
            mobile_phone = kwargs.get("mobile_phone")
            about_user = kwargs.get("about_user")
            languages = kwargs.get("languages")
            interests = kwargs.get("interests")
            skills = kwargs.get("skills")
            print(languages, interests, skills)
            u, _ = UserProfile.objects.get_or_create(user=user)
            u.date_of_birth = datetime.fromtimestamp(int(date_of_birth) / 1000)
            u.address = address
            u.city = city
            u.country = country
            u.gender = gender
            u.mobile_phone = mobile_phone
            u.role = role
            u.profession = profession
            u.full_name = full_name
            u.mobile_phone = mobile_phone
            u.about_user = about_user
            u.languages = languages
            u.interests = interests
            u.skills = skills
            u.save()
            return CreateUserProfile(success=True, msg="Profile Updated")
        except ObjectDoesNotExist:
            return CreateUserProfile(success=False, msg="Object doesn't exist")
        except PermissionDenied:
            return CreateUserProfile(success=False, msg="User is not authenticated")
        except Exception as e:
            print(e)
            return CreateUserProfile(success=False, msg="Other error")


class UpdateRole(Mutation):
    class Arguments:
        role = String()

    success = String()
    msg = String()

    # @login_required
    def mutate(root, info, **kwargs):
        try:
            if not info.context.user.is_authenticated:
                raise PermissionDenied
            user = info.context.user
            role = kwargs.get("role")
            existing_role = user.userprofile.role
            if role == existing_role:
                return UpdateRole(
                    success=False, msg="Didn't update role already exists"
                )
            user.userprofile.role = role
            user.userprofile.save()
            return UpdateRole(success=True, msg="Role has been updated successfully")

        except PermissionDenied:
            return UpdateRole(success=False, msg="User doesn't have permission")
        except Exception:
            return UpdateRole(success=False, msg="Some unknown error")


class UpdateInterest(Mutation):
    class Arguments:
        interests = JSONString()

    success = String()
    msg = String()

    # @login_required
    def mutate(root, info, **kwargs):
        try:
            if not info.context.user.is_authenticated:
                raise PermissionDenied
            user = info.context.user
            interests = kwargs.get("interests")
            existing_interests = user.userprofile.role
            if interests == existing_interests:
                return UpdateInterest(
                    success=False, msg="Didn't update interest already exists"
                )
            user.userprofile.interests = interests
            user.userprofile.save()
            return UpdateInterest(
                success=True, msg="Interest has been updated successfully"
            )

        except PermissionDenied:
            return UpdateRole(success=False, msg="User doesn't have permission")
        except Exception:
            return UpdateRole(success=False, msg="Some unknown error")


class UpdateSkill(Mutation):
    class Arguments:
        skills = JSONString()

    success = String()
    msg = String()

    # @login_required
    def mutate(root, info, **kwargs):
        try:
            if not info.context.user.is_authenticated:
                raise PermissionDenied
            user = info.context.user
            skills = kwargs.get("skills")
            existing_skills = user.userprofile.role
            if skills == existing_skills:
                return UpdateInterest(
                    success=False, msg="Didn't update skill already exists"
                )
            user.userprofile.skills = skills
            user.userprofile.save()
            return UpdateInterest(
                success=True, msg="Skill has been updated successfully"
            )

        except PermissionDenied:
            return UpdateSkill(success=False, msg="User doesn't have permission")
        except Exception:
            return UpdateSkill(success=False, msg="Some unknown error")


class UpdateLanguage(Mutation):
    class Arguments:
        languages = JSONString()

    success = String()
    msg = String()

    # @login_required
    def mutate(root, info, **kwargs):
        try:
            if not info.context.user.is_authenticated:
                raise PermissionDenied
            user = info.context.user
            languages = kwargs.get("languages")
            existing_languages = user.userprofile.role
            if languages == existing_languages:
                return UpdateInterest(
                    success=False, msg="Didn't update language already exists"
                )
            user.userprofile.languages = languages
            user.userprofile.save()
            return UpdateInterest(
                success=True, msg="Language has been updated successfully"
            )

        except PermissionDenied:
            return UpdateLanguage(success=False, msg="User doesn't have permission")
        except Exception:
            return UpdateLanguage(success=False, msg="Some unknown error")


class UserProfileMutation(ObjectType):
    create_user_profile = CreateUserProfile.Field()
    update_user_profile = UpdateUserProfile.Field()
    update_user_interest = UpdateInterest.Field()
    update_user_skill = UpdateSkill.Field()
    update_user_language = UpdateLanguage.Field()
    update_user_role = UpdateRole.Field()
