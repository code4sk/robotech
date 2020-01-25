from django.db import models
from django.contrib.auth.models import User


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    one = models.PositiveIntegerField(default=0)
    two = models.PositiveIntegerField(default=0)
    three = models.PositiveIntegerField(default=0)
