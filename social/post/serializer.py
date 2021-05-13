from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id','user','content']
        """
        extra_kwargs make it easy if you know it.
        """
        extra_kwargs = {
            'user' : {'read_only' : True}
        }
        
    def validate_content(self, value):
        if len(value) > 100:
            raise serializers.ValidationError("This Post is too long")
        return value