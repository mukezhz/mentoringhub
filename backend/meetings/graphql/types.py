from graphene_django import DjangoObjectType
from ..models import Meeting


class MeetingType(DjangoObjectType):
    class Meta:
        model = Meeting
        fields = '__all__'
