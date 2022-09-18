import json
from urllib import request
from graphql import GraphQLError
from graphene import ObjectType, Boolean, String, JSONString, Mutation
from graphql_jwt.decorators import login_required

# from .types import CustomUserType
from ..models import Mentorship


class CreateMentorship(Mutation):
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
        user = info.context.user
        try:
            qna = kwargs.get("qna")
            mentor_id = kwargs.get("mentor_id")
            mentee_id = kwargs.get("mentee_id")
            status = kwargs.get("status")
            available = kwargs.get("available")
            available_hour = kwargs.get("available_hour")
            m, _ = Mentorship.objects.get_or_create(
                mentor_id=mentor_id, mentee_id=mentee_id
            )
            m.qna = qna
            m.mentor_id = mentor_id
            m.mentee_id = mentee_id
            m.status = status
            m.available = available
            m.available_hour = available_hour

            m.save()

            return CreateMentorship(
                success=True,
                msg="Meeting is created or updated successfully",
                data=json.dumps(kwargs),
            )
        except Exception as e:
            return CreateMentorship(success=False, msg=e)


class MeetingMutation(ObjectType):
    create_meeting = CreateMentorship.Field()
