import pathlib
import django
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from graphql_jwt.decorators import jwt_cookie
from . import views


class CustomGraphQLView(GraphQLView):
    def execute_graphql_request(self, *args, **kwargs):
        """Extract any exceptions and send them to Sentry"""
        result = super().execute_graphql_request(*args, **kwargs)
        if result.errors:
            return result
        return result


def graphiql(request):
    """Trivial view to serve the `graphiql.html` file."""
    del request
    graphiql_filepath = pathlib.Path(__file__).absolute().parent / "graphiql.html"
    with open(graphiql_filepath) as f:
        return django.http.response.HttpResponse(f.read())


urlpatterns = [
    # path("", path(views.frontend)),
    path("", include("socialauth.urls")),
    path("graphiql/", graphiql),
    path("admin/", admin.site.urls),
    path("graphql/", csrf_exempt(jwt_cookie(CustomGraphQLView.as_view(graphiql=True)))),
]


static_path = static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static_path
