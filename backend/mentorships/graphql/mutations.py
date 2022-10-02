import json
from datetime import datetime
from graphql import GraphQLError
from graphene import ObjectType, Boolean, String, JSONString, Mutation, DateTime, Int
from graphql_jwt.decorators import login_required
from django.db.models import Q

from meetings.models import Meeting


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
    status = String()
    id = String()

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
            m.qna = json.loads(qna)
            m.mentor_id = mentor_id
            m.mentee_id = mentee_id

            m.save()

            return RequestMentorship(
                success=True, msg="Applied for mentorship", id=m.id, status=m.status
            )
        except Exception as e:
            return RequestMentorship(success=False, msg=e)


class ReplyMentorship(Mutation):
    """
    Reply for Mentorship
    """

    class Arguments:
        status = String(required=True)
        available_time = String(required=True)
        available_date = String(required=True)
        id = String(required=True)
        room = String(required=True)
        description = String(required=True)
        participants = JSONString(required=True)
        status = String(required=True)

    success = Boolean()
    msg = String()
    status = String()

    @login_required
    def mutate(root, info, **kwargs):
        user = info.context.user
        try:
            id = kwargs.get("id")
            status = kwargs.get("status")
            available_time = kwargs.get("available_time")
            available_hour = kwargs.get("available_hour")
            m = Mentorship.objects.get(id=id)
            m.available = datetime.fromtimestamp(int(available_time) / 1000)
            m.available_hour = available_hour
            m.status = status

            m.save()
            if status == "ACCEPTED":
                room = kwargs.get("room")
                description = kwargs.get("description")
                participants = kwargs.get("participants")
                status = kwargs.get("status")
                meeting, _ = Meeting.objects.get_or_create(users=user)
                meeting.room = room
                meeting.title = m.title
                meeting.description = description
                meeting.participants = json.dumps(participants)
                meeting.status = status
                meeting.save()

            return ReplyMentorship(
                success=True,
                msg="Response for Mentorship",
                status=m.status,
            )
        except Exception as e:
            return ReplyMentorship(success=False, msg=e)


class MentorshipMutation(ObjectType):
    apply_mentorship = RequestMentorship.Field()
    reply_mentorship = ReplyMentorship.Field()
