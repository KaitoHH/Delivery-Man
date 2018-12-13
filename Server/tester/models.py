from django.db import models


# Create your models here.
class Tester(models.Model):
    name = models.CharField(max_length=20)
    created = models.DateTimeField(auto_now_add=True)
    credit = models.IntegerField(default=100)
    status = models.BooleanField(default=True)
