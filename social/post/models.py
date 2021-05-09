from django.db import models
from django.contrib.auth import get_user_model

USER = get_user_model()
# Create your models here.


class Post(models.Model):
    user = models.ForeignKey(USER, on_delete=models.CASCADE)
    content = models.CharField(max_length=100)
    # picture = models.ImageField(null=True,blank=True)

    def __str__(self):
        return f"{self.user} || {self.content[:20]}..."
