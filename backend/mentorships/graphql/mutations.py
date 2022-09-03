from urllib import request
from graphql import GraphQLError
from graphene import ObjectType, Boolean, String, JSONString, Mutation
from graphql_jwt.decorators import login_required

# from .types import CustomUserType
from ..models import Mentorship


class CreateMentoship(Mutation):
    """
    Creating Mentorship.

    """

    class Arguments:
        qna = String(request=True)
        mentor_id = String(required=True)
        mentee_id = String(required=True)

    success = Boolean()
    msg = String()
    data = JSONString()

    @login_required
    def mutate(root, info, **kwargs):
        try:
            qna = kwargs.get("room")
            mentor_id = kwargs.get("title")
            mentee_id = kwargs.get("description")
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
