from django.core.exceptions import ObjectDoesNotExist, PermissionDenied
from graphene import ObjectType, Mutation, Boolean, JSONString, String, DateTime
from graphql_auth import mutations

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
        date_of_birth = DateTime(required=False)
        address = String(required=False)
        city = String(required=False)
        country = String(required=False)
        gender = String(required=False)
        mobile_phone = String(required=False)
        role = String(required=True)
        profession = String(required=True)

    success = Boolean()
    msg = String()
    # custom_user = Field(CustomUserType)

    def mutate(root, info, **kwargs):
        # if info.context.user is not
        try:
            if not info.context.user.is_authenticated:
                raise PermissionDenied
            user = info.context.user
            date_of_birth = kwargs.get("date_of_birth")
            address = kwargs.get("address")
            city = kwargs.get("city")
            country = kwargs.get("country")
            gender = kwargs.get("gender")
            mobile_phone = kwargs.get("mobile_phone")
            role = kwargs.get("role")
            profession = kwargs.get("profession")
            u, _ = UserProfile.objects.get_or_create(user=user)
            u.date_of_birth = date_of_birth
            u.address = address
            u.city = city
            u.country = country
            u.gender = gender
            u.mobile_phone = mobile_phone
            u.role = role
            u.profession = profession
            u.save()
            return CreateUserProfile(success=True, msg="Profile Created")
        except ObjectDoesNotExist:
            return CreateUserProfile(success=False, msg="Object doesn't exist")
        except PermissionDenied:
            return CreateUserProfile(success=False, msg="User is not authenticated")
        except Exception:
            return CreateUserProfile(success=False, msg="Other error")


class CreateInterest(Mutation):
    class Arguments:
        domain = String()
        interest = JSONString()

    success = String()
    msg = String()

    def mutate(root, info, **kwargs):
        try:
            if not info.context.user.is_authenticated:
                raise PermissionDenied
            user = info.context.user
            domain = kwargs.get("domain")
            interest = kwargs.get("interest")

            u, _ = UserInterest.objects.get_or_create(userprofile=user.userprofile)
            u.domain = domain
            u.interest = interest
            u.save()
            return CreateInterest(
                success=True, msg="User Interest is created or updated successfully"
            )
        except PermissionDenied:
            return CreateInterest(success=False, msg="User doesn't have permission")
        except Exception:
            return CreateInterest(success=False, msg="Some unknown error")

class CreateSkill(Mutation):
    class Arguments:
        domain = String()
        skill = JSONString()

    success = String()
    msg = String()

    def mutate(root, info, **kwargs):
        try:
            if not info.context.user.is_authenticated:
                raise PermissionDenied
            user = info.context.user
            domain = kwargs.get("domain")
            skill = kwargs.get("skill")

            u, _ = UserSkill.objects.get_or_create(userprofile=user.userprofile)
            u.domain = domain
            u.skill = skill
            u.save()
            return CreateSkill(
                success=True, msg="User Skill is created or updated successfully"
            )
        except PermissionDenied:
            return CreateSkill(success=False, msg="User doesn't have permission")
        except Exception:
            return CreateSkill(success=False, msg="Some unknown error")


class UserProfileMutation(ObjectType):
    create_user_profile = CreateUserProfile.Field()
    create_user_interest = CreateInterest.Field()
    create_user_skill = CreateSkill.Field()
