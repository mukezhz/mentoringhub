"""Graphql implementation for users."""
import graphene
from .graphql.query import MentorshipQuery
from .graphql.mutations import MentorshipMutation


class Query(MentorshipQuery, graphene.ObjectType):
    """Queries of Mentorship."""

    pass


class Mutation(MentorshipMutation, graphene.ObjectType):
    """For mutation of Mentorship."""

    pass
