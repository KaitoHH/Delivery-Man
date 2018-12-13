from django.db import models
from rest_framework import serializers


# Create your models here.
class User(models.Model):
    openid = models.CharField(max_length=65)
    nickname = models.CharField(max_length=20)
    register_date = models.DateTimeField(auto_now_add=True)
    credits = models.IntegerField(default=5)
    status = models.BooleanField(default=True)
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.nickname


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ('id', 'register_date')
