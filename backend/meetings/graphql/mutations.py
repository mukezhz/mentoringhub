from os import environ
from http import client
import json
from graphql import GraphQLError
from graphene import Int, ObjectType, Boolean, String, JSONString, Mutation
from graphql_jwt.decorators import login_required
from traitlets import default

from meetings.views import (
    check_room_active,
    create_room,
    get_join_token,
    init_room_info,
    init_user_info,
)

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


class CreateRoom(Mutation):
    class Arguments:
        room_id = String(required=True)
        room_title = String(required=True)
        empty_timeout = Int(required=False)

    success = Boolean()
    msg = String()
    status = Boolean()

    def mutate(root, info, **kwargs):
        room_id = kwargs.get("room_id")
        room_title = kwargs.get("room_title")
        empty_timeout = kwargs.get("empty_timeout")
        room_info = {}
        if not empty_timeout:
            room_info = init_room_info(
                room_id=room_id, room_title=room_title, empty_timeout=empty_timeout
            )
        else:
            room_info = init_room_info(
                room_id=room_id, room_title=room_title, empty_timeout=empty_timeout
            )
        res = create_room(room_info)
        if not res:
            return CreateRoom(
                success=False, msg="unable to create room!!!", status=False
            )
        if res["msg"] == "room already exists":
            return CreateRoom(success=False, msg="room already exists!!!", status=False)

        return CreateRoom(success=True, msg=res["msg"], status=True)


class CheckRoomActive(Mutation):
    class Arguments:
        room_id = String(required=True)

    success = Boolean()
    msg = String()
    status = Boolean()

    def mutate(root, info, **kwargs):
        room_id = kwargs.get("room_id")
        res = check_room_active(room_id)
        if not res:
            return CheckRoomActive(
                success=False, msg="unable to check room active!!!", status=False
            )
        return CheckRoomActive(success=True, msg=res["msg"], status=res["status"])


class FetchJoinToken(Mutation):
    class Arguments:
        room_id = String(required=True)
        user_name = String(required=True)
        user_id = String(required=True)
        user_type = String(required=False, default_value="admin")

    success = Boolean()
    msg = String()
    status = Boolean()
    token = String()

    def mutate(root, info, **kwargs):
        room_id = kwargs.get("room_id")
        user_name = kwargs.get("user_name")
        user_id = kwargs.get("user_id")
        user_type = kwargs.get("user_type")
        user_info = init_user_info(
            user_name=user_name, user_id=user_id, user_type=user_type
        )
        token = get_join_token(room_id=room_id, user_info=user_info)

        if not token["status"]:
            return FetchJoinToken(
                success=False, msg="unable to fetch token!!!", status=False, token=None
            )
        return FetchJoinToken(
            success=True, msg="success", status=True, token=token["token"]
        )


class MeetingMutation(ObjectType):
    create_meeting = CreateMeeting.Field()
    fetch_join_token = FetchJoinToken.Field()
    check_room_active = CheckRoomActive.Field()
    create_room = CreateRoom.Field()
