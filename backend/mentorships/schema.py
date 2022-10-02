"""Graphql implementation for users."""
import graphene
from .graphql.query import MentorshipQuery
from .graphql.mutations import MentorshipMutation
from .graphql.subscriptions import MentorshipSubscription


class Query(MentorshipQuery, graphene.ObjectType):
    """Queries of Mentorship."""

    pass


class Mutation(MentorshipMutation, graphene.ObjectType):
    """For mutation of Mentorship."""

    pass


class Subscription(MentorshipSubscription, graphene.ObjectType):
    """For subscription of Mentorship."""

    pass
