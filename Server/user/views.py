from rest_framework import viewsets
from user.models import User, UserSerializer, Location, LocationSerializer
from order.models import Order
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, mixins


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filterset_fields = {
        'credits': ['lt', 'gt'],
        'openid': ['exact'],
        'verified': ['exact']
    }
    search_fields = ('nickname',)


class LocationView(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = LocationSerializer

    def get_queryset(self):
        order = Order.objects.get(pk=self.request.query_params['order'])
        return Location.objects.filter(user=self.request.query_params['user'], start_time__gte=order.acceptTime)
