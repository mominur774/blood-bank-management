from django.db import models
from django.contrib.auth.models import AbstractUser
import enum_helper
# Create your models here.

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class User(AbstractUser):
    blood_group = models.CharField(max_length=5, choices=enum_helper.BLOOD_GROUP.choices)
    avatar = models.ImageField(upload_to='avatar', blank=True, null=True)
    is_donor = models.BooleanField(default=False)
    is_recipient = models.BooleanField(default=False)