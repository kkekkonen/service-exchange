from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.utils import timezone


# Create your models here.
class Category(models.Model):
    category = models.CharField(max_length=64)

class Request(models.Model):
    title = models.CharField(max_length=64)
    consumer = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    maxPrice = models.FloatField(default=0)
    minPrice = models.FloatField(default=0)
    zipcode = models.IntegerField
    description = models.TextField
    timestamp = models.DateTimeField(editable=False, default=timezone.now)
