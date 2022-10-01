from graphene_django import DjangoObjectType
from ..models import Mentorship


class MentorshipType(DjangoObjectType):
    class Meta:
        model = Mentorship
        fields = "__all__"
