from django.db import models
from rest_framework import serializers


# Create your models here.
class User(models.Model):
    openid = models.CharField(max_length=65)
    nickname = models.CharField(max_length=20)
    register_date = models.DateTimeField(auto_now_add=True)
    credits = models.IntegerField(default=100)
    status = models.BooleanField(default=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('openid', 'nickname', 'register_date', 'credits', 'status')
        read_only_fields = ('id', 'register_date')
