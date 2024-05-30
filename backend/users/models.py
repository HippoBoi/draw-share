from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class User(models.Model):
    username = models.CharField(max_length=25)
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    picture = models.ImageField(upload_to="profile_picture/", blank=True, null=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
    
    def check_password(self, raw_password):
        return check_password(raw_password, self.password)