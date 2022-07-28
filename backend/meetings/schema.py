"""Graphql implementation for users."""
import graphene
from .graphql.query import MeetingAllQuery, MeetingOneQuery
from .graphql.mutations import MeetingMutation


class Query(MeetingAllQuery, MeetingOneQuery, graphene.ObjectType):
    """Queries of Meeting."""

    pass

class Mutation(MeetingMutation, graphene.ObjectType):
    """For mutation of Meeting."""
    pass