from graphql.error import GraphQLError
from graphene import ObjectType, List, Field, String, Float
from recommenders.views import recommend_colaborate, recommend_content
from users.models import CustomUser
from graphql_jwt.decorators import login_required


class RecommendType(ObjectType):

    email = String()
    probability = String(required=False)
    full_name = String()


class RecommendQuery(ObjectType):
    collaborate_filtering = List(RecommendType)
    content_filtering = List(RecommendType, email=String(required=True))

    @login_required
    def resolve_collaborate_filtering(root, info, **kwargs):
        user = info.context.user
        print(user)
        try:
            return recommend_colaborate()
        except Exception as e:
            raise (Exception("Unable to recommend!!!"))

    @login_required
    def resolve_content_filtering(root, info, **kwargs):
        try:
            email = kwargs.get("email")
            return recommend_content(email)
        except Exception as e:
            raise (Exception("Unable to recommend!!!"))
