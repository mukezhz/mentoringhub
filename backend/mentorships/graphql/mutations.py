import json
from graphql import GraphQLError
from graphene import ObjectType, Boolean, String, JSONString, Mutation, DateTime
from graphql_jwt.decorators import login_required
from django.db.models import Q


# from .types import CustomUserType
from ..models import Mentorship


class RequestMentorship(Mutation):
    """
    Apply for Mentorship.

    """

    class Arguments:
        title = String(required=True)
        qna = String(required=True)
        mentor_id = String(required=True)
        mentee_id = String(required=True)

    success = Boolean()
    msg = String()
    data = JSONString()

    @login_required
    def mutate(root, info, **kwargs):
        user = info.context.user
        try:
            title = kwargs.get("title")
            qna = kwargs.get("qna")
            mentor_id = kwargs.get("mentor_id")
            mentee_id = kwargs.get("mentee_id")
            m, _ = Mentorship.objects.get_or_create(
                mentor_id=mentor_id, mentee_id=mentee_id
            )
            m.title = title
            m.qna = qna
            m.mentor_id = mentor_id
            m.mentee_id = mentee_id

            m.save()

            return RequestMentorship(
                success=True,
                msg="Applied for mentorship",
                data=json.dumps(kwargs),
            )
        except Exception as e:
            return RequestMentorship(success=False, msg=e)


class ReplyMentorship(Mutation):
    """
    Reply for Mentorship
    """

    class Arguments:
        title = String(required=True)
        status = String(required=True)
        available_time = DateTime(required=True)
        available_hour = DateTime(required=True)
        mentor_id = String(required=True)
        mentee_id = String(required=True)

    success = Boolean()
    msg = String()
    data = JSONString()

    @login_required
    def mutate(root, info, **kwargs):
        user = info.context.user
        try:
            mentor_id = kwargs.get("mentor_id")
            mentee_id = kwargs.get("mentee_id")
            title = kwargs.get("title")
            status = kwargs.get("status")
            available_time = kwargs.get("available_time")
            available_hour = kwargs.get("available_hour")
            m = Mentorship.objects.filter(
                mentor_id=mentor_id, mentee_id=mentee_id, title=title
            ).first()
            m.available = available_time
            m.available_hour = available_hour
            m.status = status

            m.save()

            return ReplyMentorship(
                success=True,
                msg="Response for Mentorship",
                data=json.dumps(kwargs),
            )
        except Exception as e:
            return ReplyMentorship(success=False, msg=e)


class MentorshipMutation(ObjectType):
    apply_mentorship = RequestMentorship.Field()
    reply_mentorship = ReplyMentorship.Field()
