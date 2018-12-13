from rest_framework import viewsets
from user.models import User, UserSerializer, Store, StoreSerializer, Goods, GoodsSerializer, StoreGoods, \
    StoreGoodsSerializer
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


class StoreView(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filterset_fields = {
        'star': ['lt', 'gt']
    }
    search_fields = ('name',)


class GoodsView(viewsets.ModelViewSet):
    queryset = Goods.objects.all()
    serializer_class = GoodsSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    search_fields = ('name',)


class StoreGoodsView(viewsets.ModelViewSet):
    queryset = StoreGoods.objects.all()
    serializer_class = StoreGoodsSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)