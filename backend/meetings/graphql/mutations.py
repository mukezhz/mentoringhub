from os import environ
from http import client
import json
from graphql import GraphQLError
from graphene import ObjectType, Boolean, String, JSONString, Mutation
from graphql_jwt.decorators import login_required

# from .types import CustomUserType
from ..models import Meeting

HOST = environ.get("MEETING_HOST") or "localhost:8000"
MEETING_URL = f"/api/meetings"
HEADERS = {"Content-Type": "application/json"}


class CreateMeeting(Mutation):
    """
    Creating meeting.

    """

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
        url = f"{MEETING_URL}/create"
        conn = client.HTTPConnection(HOST)
        try:
            room = kwargs.get("room")
            title = kwargs.get("title")
            description = kwargs.get("description")
            participants = kwargs.get("participants")
            status = kwargs.get("status")
            cover_image = kwargs.get("cover_image")
            country = kwargs.get("country")
            app_id = kwargs.get("app_id")
            payload = {
                "room": room,
                "title": title,
                "description": description,
                "participants": participants,
                "status": status or "NEW",
                "cover_image": cover_image,
                "country": country,
                "app_id": app_id,
            }
            conn.request("POST", url, body=json.dumps(payload), headers=HEADERS)
            res = conn.getresponse()
            data = res.read()
            json_data = json.loads(data.decode("utf-8"))
            if res.status >= 400:
                raise GraphQLError(json_data.get("message"))

            return CreateMeeting(
                success=True,
                msg="Meeting is created or updated successfully",
                data=json_data.get("data"),
            )
        except Exception as e:
            return CreateMeeting(success=False, msg=e)
        finally:
            conn.close()


class MeetingMutation(ObjectType):
    create_meeting = CreateMeeting.Field()
