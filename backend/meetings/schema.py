"""Graphql implementation for users."""
import graphene
from .graphql.query import MeetingQuery
from .graphql.mutations import MeetingMutation


class Query(MeetingQuery, graphene.ObjectType):
    """Queries of Meeting."""

    pass

class Mutation(MeetingMutation, graphene.ObjectType):
    """For mutation of Meeting."""
    pass