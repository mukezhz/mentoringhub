from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("google/", views.google),
    path("twitter/", views.twitter),
    path("github/", views.github),
    path("facebook/", views.facebook),
    path("auth/", views.auth, name="auth"),
    path("twitter-auth/", views.twitter_auth, name="twitter-auth"),
    path("github-auth/", views.github_auth, name="github-auth"),
    path("facebook-auth/", views.facebook_auth, name="facebook-auth"),
    path("logout/", views.logout, name="logout"),
]
