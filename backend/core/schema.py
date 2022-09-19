"""Graphql schema for project."""
import graphene
from users.schema import Query as UserQuery, Mutation as UserMutation
from meetings.schema import Query as MeetingQuery, Mutation as MeetingMutation
from mentorships.schema import Query as MentorshipQuery, Mutation as MentorshipMutation


class Query(UserQuery, MeetingQuery, MentorshipQuery, graphene.ObjectType):
    """Project Graphql Query."""

    pass


class Mutation(UserMutation, MeetingMutation, MentorshipMutation, graphene.ObjectType):
    """Project Graphql Mutation."""

    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
