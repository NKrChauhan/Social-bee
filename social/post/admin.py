from django.contrib import admin
from django.forms import models
from .models import Post
# Register your models here.

class PostAdmin(admin.ModelAdmin):
    search_fields = ('user__username', 'content')
    list_display = ('__str__','user', 'content')
    

admin.site.register(Post,PostAdmin)
