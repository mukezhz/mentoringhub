from datetime import timedelta
import os, warnings
from pathlib import Path
from django.core.management.utils import get_random_secret_key
from corsheaders.defaults import default_headers

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


DEBUG = os.getenv("DEBUG")
DOMAIN = os.getenv("DOMAIN")
EMAIL = os.getenv("EMAIL")
# database credentials
DB_NAME = os.getenv("DB_NAME")
DB_USERNAME = os.getenv("DB_USERNAME", default="postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", default="postgres")
DB_HOST = os.getenv("DB_HOST", default="localhost")
DB_PORT = os.getenv("DB_PORT", default=5432)

SECRET_KEY = os.environ.get("SECRET_KEY", default=get_random_secret_key())

ALLOWED_HOSTS = [DOMAIN]

DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.sites",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]
LIBRARY_APPS = [
    # "django.contrib.staticfiles",
    "graphene_django",
    "graphql_jwt.refresh_token.apps.RefreshTokenConfig",
    "channels",
    "django_filters",
    "corsheaders",
    "anymail",
]
USER_APPS = [
    "graphql_auth",
    "users.apps.UsersConfig",
    "meetings.apps.MeetingsConfig",
    "mentorships.apps.MentorshipsConfig",
    "recommenders.apps.RecommendersConfig",
    "socialauth.apps.SocialauthConfig",
]
INSTALLED_APPS = DJANGO_APPS + LIBRARY_APPS + USER_APPS

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

ASGI_APPLICATION = "core.asgi.application"


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": DB_NAME,
        "USER": DB_USERNAME,
        "PASSWORD": DB_PASSWORD,
        "HOST": DB_HOST,
        "PORT": DB_PORT,
    }
}

CHANNEL_LAYERS = {"default": {"BACKEND": "channels.layers.InMemoryChannelLayer"}}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Kathmandu"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "static"
STATICFILES_DIR = [
    BASE_DIR / "static",
]
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "uploads"

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

GRAPHENE = {
    "SCHEMA": "core.schema.schema",
    "MIDDLEWARE": ["graphql_jwt.middleware.JSONWebTokenMiddleware"],
}

AUTHENTICATION_BACKENDS = [
    "graphql_auth.backends.GraphQLAuthBackend",
    "graphql_jwt.backends.JSONWebTokenBackend",
    "django.contrib.auth.backends.ModelBackend",
]

GRAPHQL_JWT = {
    "JWT_COOKIE_NAME": "JWT_TOKEN",
    "JWT_COOKIE_SAMESITE": "None",
    "JWT_COOKIE_DOMAIN": os.environ.get("FRONTEND_DOMAIN", "localhost"),
    "JWT_COOKIE_SECURE": True,
    "JWT_VERIFY": True,
    "JWT_VERIFY_EXPIRATION": True,
    "JWT_REUSE_REFRESH_TOKENS": True,
    "JWT_LONG_RUNNING_REFRESH_TOKEN": True,
    "JWT_ALLOW_REFRESH": True,
    "JWT_ALLOW_ARGUMENT": True,
    "JWT_EXPIRATION_DELTA": timedelta(minutes=15),
    "JWT_REFRESH_EXPIRATION_DELTA": timedelta(days=1),
    "JWT_ALLOW_ANY_CLASSES": [
        "graphql_auth.mutations.Register",
        "graphql_auth.mutations.VerifyAccount",
        "graphql_auth.mutations.ResendActivationEmail",
        "graphql_auth.mutations.SendPasswordResetEmail",
        "graphql_auth.mutations.PasswordReset",
        "graphql_auth.mutations.ObtainJSONWebToken",
        "graphql_auth.mutations.VerifyToken",
        "graphql_auth.mutations.RefreshToken",
        "graphql_auth.mutations.RevokeToken",
        "graphql_auth.mutations.VerifySecondaryEmail",
    ],
}

GRAPHQL_AUTH = {
    "LOGIN_ALLOWED_FIELDS": ["email", "username"],
    "JWT_COOKIE_SAMESITE": "None",
    "EXPIRATION_PASSWORD_RESET_TOKEN": timedelta(days=1),
    "EMAIL_TEMPLATE_VARIABLES": {
        "frontend_domain": os.environ.get("FRONTEND_SITE") or "localhost:3000",
        "protocol": "http",
    },
}
REGISTER_MUTATION_FIELDS = ["username"]
REGISTER_MUTATION_FIELDS_OPTIONAL = ["email"]

SITE_ID = 1
# EMAIL_HOST = os.getenv("EMAIL_HOST")
# EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
# EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_TIMEOUT = 5000
# EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

ANYMAIL = {
    "MAILGUN_API_KEY": os.getenv("MAILGUN_API_KEY"),
    "MAILGUN_API_URL": os.getenv("MAILGUN_API_URL"),
    "MAILGUN_SENDER_DOMAIN": os.getenv("MAILGUN_SENDER_DOMAIN"),
}
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL")
SERVER_EMAIL = os.getenv("SERVER_EMAIL")
EMAIL_BACKEND = "anymail.backends.console.EmailBackend"

AUTH_USER_MODEL = "users.CustomUser"

CORS_ALLOW_HEADERS = list(default_headers) + [
    "X-Amz-Date",
    "Access-Control-Request-Headers",
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin",
    "XMLHttpRequest",
    "Access-Control-Allow-Credentials",
]
# CORS_EXPOSE_HEADERS = ["Content-Type", "X-CSRFToken"]
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

CSRF_USE_SESSIONS = True
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_SAMESITE = "None"
# CORS_ORIGIN_WHITELIST = ["http://localhost:3000"]

SESSION_COOKIE_DOMAIN = os.environ.get("FRONTEND_DOMAIN", "localhost")
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = "None"

AUTHLIB_OAUTH_CLIENTS = {
    "google": {
        "client_id": os.getenv("GOOGLE_CLIENT_ID"),
        "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
    },
    "twitter": {
        "client_id": os.environ.get("TWITTER_CLIENT_ID"),
        "client_secret": os.environ.get("TWITTER_CLIENT_SECRET"),
    },
    "github": {
        "client_id": os.environ.get("GITHUB_CLIENT_ID"),
        "client_secret": os.environ.get("GITHUB_CLIENT_SECRET"),
    },
    "facebook": {
        "client_id": os.environ.get("FACEBOOK_CLIENT_ID"),
        "client_secret": os.environ.get("FACEBOOK_CLIENT_SECRET"),
    },
}

DOMAIN_NAME = os.environ.get("DOMAIN_NAME", "localhost")
