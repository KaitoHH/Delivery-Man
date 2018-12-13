from rest_framework import viewsets
from user.models import User, UserSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filterset_fields = {
        'credits': ['lt', 'gt'],
        'openid': ['exact']
    }
    search_fields = ('nickname',)
