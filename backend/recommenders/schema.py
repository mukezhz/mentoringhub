"""Graphql implementation for users."""
import graphene
from .graphql.query import RecommendQuery


class Query(RecommendQuery, graphene.ObjectType):
    """Queries of Recommend."""

    pass


# class Mutation(MentorshipMutation, graphene.ObjectType):
#     """For mutation of Mentorship."""

#     pass
