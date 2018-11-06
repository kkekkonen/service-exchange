from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator
from enum import Enum

class ServiceStatus(Enum):
    PENDING = "Pending"
    STARTED = "Started"
    CANCELED = "Canceled"
    COMPLETED = "Completed"

class OfferStatus(Enum):
    PENDING = "Pending"
    STARTED = "Accepted"
    CANCELED = "Canceled"
    REJECTED = "Rejected"

# Create your models here.
class Category(models.Model):
    category = models.CharField(max_length=64)

class Request(models.Model):
    title = models.CharField(max_length=64)
    consumer = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    maxPrice = models.FloatField(default=0)
    minPrice = models.FloatField(default=0)
    zipcode = models.IntegerField(default=0)
    description = models.TextField(default="")
    timestamp = models.DateTimeField(editable=False, default=timezone.now)

class Service(models.Model):
    title = models.CharField(max_length=64)
    consumer = models.ForeignKey(User, related_name='ServiceConsumer', on_delete=models.CASCADE)
    provider = models.ForeignKey(User, related_name='ServiceProvider', on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.FloatField(default=0)
    zipcode = models.IntegerField(default=0)
    description = models.TextField(default="")
    status = [(tag, tag.value) for tag in ServiceStatus]
    timestamp = models.DateTimeField(editable=False, default=timezone.now)
    rating = models.FloatField(default=5, validators=[MinValueValidator(0), MaxValueValidator(5)])

class ServiceOffer(models.Model):
    title = models.CharField(max_length=64)
    provider = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    maxPrice = models.FloatField(default=0)
    minPrice = models.FloatField(default=0)
    zipcode = models.IntegerField(default=0)
    description = models.TextField(default="")
    timestamp = models.DateTimeField(editable=False, default=timezone.now)

class Offer(models.Model):
    provider = models.ForeignKey(User, on_delete=models.CASCADE)
    request = models.ForeignKey(Request, on_delete=models.CASCADE, related_name='offers')
    price = models.FloatField(default=0)
    description = models.TextField(default="")
    status = [(tag, tag.value) for tag in OfferStatus]
    timestamp = models.DateTimeField(editable=False, default=timezone.now)
