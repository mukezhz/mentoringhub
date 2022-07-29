from graphql.error import GraphQLError
from graphene import ObjectType, List, Field, String
from graphql_jwt.decorators import login_required
from .types import MeetingType
from ..models import Meeting


class InnerItem(ObjectType):
    txt1 = String()
    txt2 = String()


class Dictionary(ObjectType):
    key = String()
    value = String()


class MeetingAllQuery(ObjectType):
    """
    query all the meetings
    """

    meetings = List(MeetingType)

    @login_required
    def resolve_meetings(root, info, **kwargs):
        return Meeting.objects.all()


class UserNotAuthenticated(ObjectType):
    message = String(required=True)


class MeetingOneQuery(ObjectType):
    """
    meeting one query by meeting id
    """

    meeting = Field(MeetingType, id=String(required=True))

    @login_required
    def resolve_meeting(root, info, **kwargs):
        id = kwargs.get("id")
        try:
            return Meeting.objects.get(id=id)
        except Meeting.DoesNotExist:
            return None
