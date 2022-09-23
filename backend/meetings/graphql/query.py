import json
from graphql.error import GraphQLError
from graphene import ObjectType, List, Field, String
from graphql_jwt.decorators import login_required
from mentorships.models import Mentorship

from users.models import CustomUser
from meetings.models import Meeting
from .types import MeetingType


class MeetingQuery(ObjectType):
    """
    query all the meetings
    """

    fetch_all_meetings = List(MeetingType)
    fetch_your_meetings = List(MeetingType)
    fetch_meeting_by_id = Field(MeetingType, id=String(required=True))
    fetch_meeting_by_email = Field(MeetingType, email=String(required=True))

    @login_required
    def resolve_fetch_all_meetings(root, info, **kwargs):
        user = info.context.user
        if not user.id:
            raise GraphQLError("unauthenticated user!!!")
        return Meeting.objects.all()

    @login_required
    def resolve_fetch_your_meetings(root, info, **kwargs):
        user = info.context.user
        if user.userprofile.role == "mentee":
            return Meeting.objects.filter(participants__contains=user.email)
        else:
            return Meeting.objects.filter(users=user)

    @login_required
    def resolve_fetch_meeting_by_id(root, info, **kwargs):
        id = kwargs.get("id")
        try:
            return Meeting.objects.get(id=id)
        except Meeting.DoesNotExist:
            return None

    @login_required
    def resolve_fetch_meeting_by_email(root, info, **kwargs):
        email = kwargs.get("email")
        try:
            user = CustomUser.objects.get(email=email)
            return Meeting.objects.get(users=user)
        except Meeting.DoesNotExist:
            return None
