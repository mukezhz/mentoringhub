from os import environ
from http import client
import json
from graphql import GraphQLError
from graphene import ObjectType, Boolean, String, JSONString, Mutation
from graphql_jwt.decorators import login_required

# from .types import CustomUserType
from ..models import Meeting


class CreateMeeting(Mutation):
    class Arguments:
        room = String(required=True)
        title = String(required=True)
        description = String(required=False)
        participants = JSONString(required=False)
        status = String(required=False)
        cover_image = String(required=False)
        country = String(required=True)
        app_id = String(required=True)

    success = Boolean()
    msg = String()
    data = JSONString()

    @login_required
    def mutate(root, info, **kwargs):
        """
        Creating meeting.
        """
        user = info.context.user
        try:
            room = kwargs.get("room")
            title = kwargs.get("title")
            description = kwargs.get("description")
            participants = kwargs.get("participants")
            status = kwargs.get("status")
            cover_image = kwargs.get("cover_image")
            country = kwargs.get("country")
            start_date = kwargs.get("start_date")
            app_id = kwargs.get("app_id")
            m, _ = Meeting.objects.get_or_create(users=user)
            m.room = room
            m.app_id = app_id
            m.title = title
            m.description = description
            m.participants = participants
            m.start_date = start_date
            m.status = status
            m.cover_image = cover_image
            m.country = country
            m.save()
            return CreateMeeting(
                success=True,
                msg="Meeting is created or updated successfully",
                data=json.dumps(kwargs),
            )
        except Exception as e:
            return CreateMeeting(success=False, msg=e)


class MeetingMutation(ObjectType):
    create_meeting = CreateMeeting.Field()
