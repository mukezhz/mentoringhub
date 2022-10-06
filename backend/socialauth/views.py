import json
from django.urls import reverse
from django.shortcuts import render, redirect
from django.http import JsonResponse
from authlib.integrations.django_client import OAuth
import requests

CONF_URL = "https://accounts.google.com/.well-known/openid-configuration"
oauth = OAuth()


def home(request):
    user = request.session.get("user")
    print("useressss", user)
    print(user)
    if user:
        return JsonResponse(data={"message": "success", "status": True, "user": user})
    return JsonResponse(data={"message": "Login Required!!!", "status": False})


def google(request):
    user = request.session.get("user")
    if user:
        return redirect("/")
    oauth.register(
        name="google",
        server_metadata_url=CONF_URL,
        client_kwargs={"scope": "openid email profile"},
    )
    client = oauth.create_client("google")
    redirect_uri = request.build_absolute_uri(reverse("auth"))
    return client.authorize_redirect(request, redirect_uri)


def twitter(request):
    user = request.session.get("user")
    if user:
        return redirect("/")
    oauth.register(
        name="twitter",
        api_base_url="https://api.twitter.com/2/",
        request_token_url="https://api.twitter.com/oauth/request_token",
        access_token_url="https://api.twitter.com/oauth/access_token",
        authorize_url="https://api.twitter.com/oauth/authenticate",
        client_kwargs={"scope": "users.read"},
    )
    client = oauth.create_client("twitter")
    user = request.session.get("user")
    print("user", user)
    if user:
        return redirect("http://localhost:3000")
    redirect_uri = request.build_absolute_uri(reverse("twitter-auth"))
    return client.authorize_redirect(request, redirect_uri)


def github(request):
    user = request.session.get("user")
    if user:
        return redirect("/")
    oauth.register(
        name="github",
        access_token_url="https://github.com/login/oauth/access_token",
        access_token_params=None,
        authorize_url="https://github.com/login/oauth/authorize",
        authorize_params=None,
        api_base_url="https://api.github.com/",
        client_kwargs={"scope": "user user:email"},
    )
    github = oauth.create_client("github")
    redirect_uri = request.build_absolute_uri(reverse("github-auth"))
    return github.authorize_redirect(request, redirect_uri)


def facebook(request):
    user = request.session.get("user")
    if user:
        return redirect("/")
    oauth.register(
        name="facebook",
        access_token_url="https://graph.facebook.com/oauth/access_token",
        access_token_params=None,
        authorize_url="https://www.facebook.com/dialog/oauth",
        authorize_params=None,
        api_base_url="https://graph.facebook.com/",
        client_kwargs={"scope": "email"},
    )
    github = oauth.create_client("facebook")
    redirect_uri = request.build_absolute_uri(reverse("facebook-auth"))
    return github.authorize_redirect(request, redirect_uri)


def auth(request):
    client = oauth.create_client("google")
    token = client.authorize_access_token(request)
    user_profile = token.get("userinfo")
    request.session["user"] = dict(user_profile)
    email = user_profile.get("email")
    name = user_profile.get("name")
    picture = user_profile.get("picture")
    password = user_profile.get("nonce")
    iss = user_profile.get("iss")
    # if iss == 'https://accounts.google.com': created account with google
    print(user_profile)
    return redirect("/")


def twitter_auth(request):
    client = oauth.create_client("twitter")
    token = client.authorize_access_token(request)
    url = f"users/me/"
    resp = client.get(
        url,
        params={
            "user.fields": "created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,url,username,verified,withheld"
        },
        token=token,
    )
    user = resp.json()
    print("useresresrseerser", user)
    request.session["user"] = dict(user.get("data"))
    # request.session["token"] = dict(token)
    # print(dict(request.session))
    return redirect("/")


def github_auth(request):
    client = oauth.create_client("github")
    token = client.authorize_access_token(request)
    resp = client.get("user", token=token)
    resp.raise_for_status()
    profile = resp.json()
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {token.get('access_token')}",
    }
    email = requests.get("https://api.github.com/user/emails", headers=headers)
    profile["email"] = email.json()
    request.session["user"] = dict(profile)
    print(profile)
    print("token", token)
    return redirect("/")


def facebook_auth(request):
    client = oauth.create_client("facebook")
    token = client.authorize_access_token(request)
    url = "https://graph.facebook.com/me?fields=id,name,email,picture"
    resp = client.get(url, token=token)
    profile = resp.json()
    print("Facebook User ", profile)
    print("Facebook token ", token)
    request.session["user"] = dict(profile)
    return redirect("/")


def logout(request):
    # request.session.pop("user", None)
    request.session.flush()
    return redirect("/")
