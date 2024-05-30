from django.db import models

class User(models.Model):
    username = models.CharField(max_length=25)
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    picture = models.ImageField(upload_to="profile_picture/", blank=True, null=True)