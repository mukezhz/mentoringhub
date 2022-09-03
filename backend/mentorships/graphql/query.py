from graphql.error import GraphQLError
from graphene import ObjectType, List, Field, String
from graphql_jwt.decorators import login_required
from .types import MeetingType
from ..models import Meeting


class MeetingAllQuery(ObjectType):
    """
    query all the meetings
    """

    meetings = List(MeetingType)

    def resolve_meetings(root, info, **kwargs):
        user = info.context.user
        if not user.id:
            raise GraphQLError("unauthenticated user!!!")
        return Meeting.objects.all()


class MeetingOneQuery(ObjectType):
    """
    meeting one query by meeting id
    """

    meeting = Field(MeetingType, id=String(required=True))

    def resolve_meeting(root, info, **kwargs):
        id = kwargs.get("id")
        try:
            return Meeting.objects.get(id=id)
        except Meeting.DoesNotExist:
            return None
