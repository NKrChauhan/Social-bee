from rest_framework import serializers
from .models import Post
from django.conf import settings
from django.contrib.auth import get_user_model
Max_Limit = settings.MAX_LIMIT_POST_CAPTION
Post_Action = settings.POST_ACTIONS

USER =  get_user_model()

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'user', 'content']

    def validate_content(self, value):
        if len(value) > Max_Limit:
            raise serializers.ValidationError("This Post is too long")
        return value

# Level one only for post view
class PostChildDisplaySerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    og_post = PostSerializer(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    is_repost = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = ['id','og_post','user','is_repost', 'content','likes','tiemstamp']

    def get_user(self,obj):
        return obj.user.username
    
    def get_likes(self,obj):
        return obj.likes.count()

    def get_is_repost(self,obj):
        return False

class PostDisplaySerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    og_post = PostChildDisplaySerializer(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = ['id','og_post','user','is_repost', 'content','likes','tiemstamp']

    def get_user(self,obj):
        return obj.user.username
    
    def get_likes(self,obj):
        return obj.likes.count()

class PostActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()

    def validate_action(self, value):
        if value not in Post_Action:
            raise serializers.ValidationError("Validation:INVALID ACTION")
        else:
            return value
