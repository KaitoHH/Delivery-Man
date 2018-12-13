from rest_framework import viewsets
<<<<<<< HEAD
from user.models import User, UserSerializer, Store, StoreSerializer, Goods, GoodsSerializer, StoreGoods, \
    StoreGoodsSerializer
=======
from user.models import User, UserSerializer
>>>>>>> ac622525425eddd5b54b482c511261c5f9c06581
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
<<<<<<< HEAD


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
=======
>>>>>>> ac622525425eddd5b54b482c511261c5f9c06581
