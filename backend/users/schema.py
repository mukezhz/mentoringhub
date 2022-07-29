"""Graphql implementation for users."""
import graphene
from graphql_auth.schema import UserQuery, MeQuery

from .graphql.query import UserProfileQuery, UserInterestQuery
from .graphql.mutations import AuthMutation, UserProfileMutation


class Query(UserQuery, MeQuery, UserProfileQuery, UserInterestQuery, graphene.ObjectType):
    """Queries of User."""

    pass


class Mutation(AuthMutation, UserProfileMutation, graphene.ObjectType):
    """For mutation of User."""
    pass
