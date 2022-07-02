"""Graphql schema for project."""
import graphene
from users.schema import Query as UserQuery, Mutation as UserMutation


class Query(UserQuery, graphene.ObjectType):
    """Project Graphql Query."""

    pass


class Mutation(UserMutation, graphene.ObjectType):
    """Project Graphql Mutation."""

    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
