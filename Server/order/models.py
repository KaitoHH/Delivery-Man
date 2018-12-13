from django.db import models
from rest_framework import serializers
from user.models import User


# Store, Goods, StoreGoods
class Goods(models.Model):
    name = models.CharField(max_length=32)
    desc = models.CharField(max_length=256)
    img = models.ImageField(blank=True)

    def __str__(self):
        return self.name


class Store(models.Model):
    name = models.CharField(max_length=32)
    desc = models.CharField(max_length=256)
    address = models.CharField(max_length=256)
    detailAddress = models.CharField(max_length=256)
    contactPhone = models.CharField(max_length=12)
    star = models.IntegerField(default=5, null=True, blank=True)
    registerDate = models.DateTimeField(auto_now_add=True)
    serviceTime = models.CharField(max_length=50, null=True, blank=True, default='08:00:00 - 18:00:00')
    latitude = models.DecimalField(max_digits=20, decimal_places=10, blank=True)
    longitude = models.DecimalField(max_digits=20, decimal_places=10, blank=True)
    img = models.ImageField(blank=True)
    Goods = models.ManyToManyField(Goods, through='StoreGoods')

    def __str__(self):
        return self.name


class StoreGoods(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    good = models.ForeignKey(Goods, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    count = models.IntegerField()


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'
        read_only_fields = ('id', 'registerDate')


class GoodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goods
        fields = '__all__'
        read_only_fields = ('id',)


class StoreGoodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreGoods
        fields = '__all__'


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    receiver = models.CharField(max_length=32)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    createTime = models.DateTimeField(auto_now_add=True)
    editTime = models.DateTimeField(auto_now=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)


class Item(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    good = models.ForeignKey(Goods, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    count = models.IntegerField()
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items', blank=True)


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True)

    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        items = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item in items:
            Item.objects.create(order=order, **item)
        return order


class OrderReadSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    items = ItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
