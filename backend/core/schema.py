"""Graphql schema for project."""
import graphene
from users.schema import Query as UserQuery, Mutation as UserMutation
from meetings.schema import Query as MeetingQuery, Mutation as MeetingMutation
from mentorships.schema import (
    Query as MentorshipQuery,
    Mutation as MentorshipMutation,
    Subscription as MentorshipSubscription,
)
from recommenders.schema import Query as RecommenderQuery


class Query(
    UserQuery, MeetingQuery, MentorshipQuery, RecommenderQuery, graphene.ObjectType
):
    """Project Graphql Query."""

    pass


class Mutation(UserMutation, MeetingMutation, MentorshipMutation, graphene.ObjectType):
    """Project Graphql Mutation."""

    pass


class Subscription(MentorshipSubscription, graphene.ObjectType):
    """Project Graphql Subscription."""

    pass


schema = graphene.Schema(query=Query, mutation=Mutation, subscription=Subscription)
