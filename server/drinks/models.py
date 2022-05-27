from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Drink(models.Model):
    id_drink = models.IntegerField()
    username = models.CharField(max_length=200, default='None')
    drink_name = models.CharField(max_length=200, unique=True)
    drink_image = models.CharField(max_length=400, default='None')
    drink_instructions = models.CharField(max_length=600, default='None')


    def __str__(self):
        return f"{self.id_drink} for {self.username}"
