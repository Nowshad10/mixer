from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Drink(models.Model):
    id_drink = models.IntegerField()
    username = models.CharField(max_length=200, default='None')

    def __str__(self):
        return f"{self.id_drink}"
