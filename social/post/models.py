from django.db import models
from django.contrib.auth import get_user_model

USER = get_user_model()
# Create your models here.

class Like(models.Model):
    user = models.ForeignKey(USER,on_delete=models.CASCADE)
    post = models.ForeignKey("Post",on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Post(models.Model):
    og_post = models.ForeignKey("self",related_name='parent',null=True,blank=True,on_delete=models.SET_NULL)
    user = models.ForeignKey(USER, on_delete=models.CASCADE)
    content = models.CharField(max_length=100)
    picture = models.ImageField( upload_to="Posts/",null=True,blank=True)
    likes = models.ManyToManyField(USER,related_name='like_user',blank=True,through=Like)
    tiemstamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} || {self.content[:20]}...|| {self.likes.count()}"

    @property
    def is_repost(self):
        return self.og_post is not None