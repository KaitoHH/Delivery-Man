from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from order.models import Store, StoreSerializer, StoreReadSerializer, Goods, GoodsSerializer, StoreGoods, \
    StoreGoodsSerializer, Order, OrderReadSerializer, OrderSerializer, Item, ItemSerializer


# Create your views here.
class StoreView(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filterset_fields = {
        'star': ['lt', 'gt']
    }
    search_fields = ('name',)

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return StoreReadSerializer
        return StoreSerializer


class GoodsView(viewsets.ModelViewSet):
    queryset = Goods.objects.all()
    serializer_class = GoodsSerializer


class StoreGoodsView(viewsets.ModelViewSet):
    queryset = StoreGoods.objects.all()
    serializer_class = StoreGoodsSerializer


class OrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = {
        'status': ['exact'],
        'user': ['exact'],
        'courier': ['exact', 'gt']
    }

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return OrderReadSerializer
        return OrderSerializer


class ItemView(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
