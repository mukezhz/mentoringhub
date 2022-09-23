from graphql.error import GraphQLError
from graphene import ObjectType, List, Field, String
from graphql_jwt.decorators import login_required
from .types import MentorshipType
from ..models import Mentorship


class MentorshipQuery(ObjectType):

    fetch_mentorships = List(MentorshipType)
    fetch_your_mentorship = List(MentorshipType)
    fetch_mentorship_by_id = Field(MentorshipType, id=String(required=True))

    def resolve_fetch_mentorships(root, info, **kwargs):
        """
        query all the meetings
        """
        user = info.context.user
        if not user.id:
            raise GraphQLError("unauthenticated user!!!")
        return Mentorship.objects.all()

    def resolve_fetch_your_mentorship(root, info, **kwargs):
        """
        query all the meetings
        """
        user = info.context.user
        if not user.id:
            raise GraphQLError("unauthenticated user!!!")
        if user.userprofile.role.lower() == "mentee":
            applications = Mentorship.objects.filter(mentee_id=user.email)
            return applications
        elif user.userprofile.role.lower() == "mentor":
            applications = Mentorship.objects.filter(mentor_id=user.email)
            return applications
        return None

    def resolve_fetch_mentorship_by_id(root, info, **kwargs):
        """
        query meeting by id
        """
        id = kwargs.get("id")
        try:
            return Mentorship.objects.get(id=id)
        except Mentorship.DoesNotExist:
            return None
