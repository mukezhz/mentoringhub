from graphql.error import GraphQLError
from graphene import ObjectType, List, Field, String
from graphql_jwt.decorators import login_required
from .types import MeetingType
from ..models import Meeting


class MeetingQuery(ObjectType):

    fetch_meetings = List(MeetingType)
    fetch_meeting_by_id = Field(MeetingType, id=String(required=True))

    def resolve_fetch_meetings(root, info, **kwargs):
        """
        query all the meetings
        """
        user = info.context.user
        if not user.id:
            raise GraphQLError("unauthenticated user!!!")
        return Meeting.objects.all()

    def resolve_meeting_by_id(root, info, **kwargs):
        """
        query meeting by id
        """
        id = kwargs.get("id")
        try:
            return Meeting.objects.get(id=id)
        except Meeting.DoesNotExist:
            return None
