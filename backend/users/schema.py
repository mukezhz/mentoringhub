"""Graphql implementation for users."""
import graphene
from graphql_auth.schema import UserQuery, MeQuery

from .graphql.query import (
    UserProfileQuery,
    UserInterestQuery,
    UserSkillQuery,
    UserInterestQuery,
)
from .graphql.mutations import AuthMutation, UserProfileMutation


class Query(UserQuery, MeQuery, UserProfileQuery, UserInterestQuery, UserSkillQuery):
    """Queries of User."""

    pass


class Mutation(AuthMutation, UserProfileMutation, graphene.ObjectType):
    """For mutation of User."""

    pass
