from django.contrib import admin
from django.forms import models
from .models import Post,Like
# Register your models here.

class LikeAdmin(admin.TabularInline):
    model = Like
    

class PostAdmin(admin.ModelAdmin):
    inlines = [
        LikeAdmin
    ]
    search_fields = ('user__username', 'content')
    list_display = ('__str__','user', 'content')
    

admin.site.register(Post,PostAdmin)
