from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    username = models.CharField(max_length=64, unique=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    date_of_birth = models.DateField(null=True, blank=True)
    avatar = models.ImageField(upload_to="users_images", null=True, blank=True)
    email = models.EmailField(unique=True)


    def __str__(self):
        return self. username
