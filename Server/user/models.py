from django.db import models
from rest_framework import serializers


# Create your models here.
class User(models.Model):
    openid = models.CharField(max_length=65)
    nickname = models.CharField(max_length=20)
    register_date = models.DateTimeField(auto_now_add=True)
    credits = models.IntegerField(default=5)
    status = models.BooleanField(default=True)


class Store(models.Model):
    name = models.CharField(max_length=32)
    desc = models.CharField(max_length=256)
    address = models.CharField(max_length=256)
    detailAddress = models.CharField(max_length=256)
    contactPhone = models.CharField(max_length=12)
    star = models.IntegerField(default=5, null=True, blank=True)
    registerDate = models.DateTimeField(auto_now_add=True)
    serviceTime = models.CharField(max_length=50, null=True, blank=True, default='08:00:00 - 18:00:00')
    latitude = models.CharField(max_length=10, blank=True)
    longitude = models.CharField(max_length=10, blank=True)
    img = models.CharField(max_length=256, blank=True, null=True)


class StoreGoods(models.Model):
    price = models.DecimalField(max_digits=20, decimal_places=2)
    count = models.PositiveIntegerField(default=0, blank=True, null=True)
    storeId = models.ForeignKey('Store', db_column='storeId', null=True, on_delete=models.SET_NULL)
    goodsId = models.ForeignKey('Goods', db_column='goodsId', null=True, on_delete=models.SET_NULL)


class Goods(models.Model):
    name = models.CharField(max_length=32)
    desc = models.CharField(max_length=256)
    img = models.CharField(max_length=256, blank=True, null=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'openid', 'nickname', 'register_date', 'credits', 'status')
        read_only_fields = ('id', 'register_date')


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ('id', 'name', 'desc', 'address', 'detailAddress', 'contactPhone', 'star', 'registerDate',
                  'serviceTime', 'latitude', 'longitude')
        read_only_fields = ('id', 'registerDate')


class GoodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goods
        fields = ('id', 'name', 'desc', 'img')
        read_only_fields = ('id',)


class StoreGoodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreGoods
        fields = '__all__'
