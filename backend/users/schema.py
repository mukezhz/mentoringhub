"""Graphql implementation for users."""
import graphene
from graphql_auth.schema import UserQuery, MeQuery

from .graphql.query import UserProfileQuery, UserInterestQuery, UserProfileOneQuery
from .graphql.mutations import AuthMutation, UserProfileMutation


class Query(
    UserQuery,
    MeQuery,
    UserProfileQuery,
    UserInterestQuery,
    # UserProfileOneQuery,
    graphene.ObjectType,
):
    """Queries of User."""

    pass


class Mutation(AuthMutation, UserProfileMutation, graphene.ObjectType):
    """For mutation of User."""

    pass
