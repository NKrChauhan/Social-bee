from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from .models import Post,Like
from .serializer import PostSerializer ,PostActionSerializer, PostDisplaySerializer
from .forms import PostForm
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import action, api_view, authentication_classes, authentication_classes, permission_classes 
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
# Create your views here.


def homeview(request,*args,**kwargs):
    return render(request, 'post/home.html', {})

# REST APIs

"""
REST API for fetching feeds at home page
"""
@api_view(['GET'])
def listPostAPI(request,*args,**kwargs):
    posts = Post.objects.all()
    serialized_data = PostDisplaySerializer(posts, many=True)
    return Response(serialized_data.data)


"""
REST API for creating the post
"""
@permission_classes([IsAuthenticated,])
@authentication_classes([SessionAuthentication,])
@api_view(['POST'])
def creationPostAPI(request,*args,**kwargs):
    serailized_obj = PostSerializer(data = request.POST)
    if serailized_obj.is_valid(raise_exception=True):
        serailized_obj.save(user = request.user)
        return Response(serailized_obj.data,status=201)
    else :
        return Response({"message":"the form data is overlimit or null"},status=400)

"""
REST API for fetching feeds detail
"""
@api_view(['GET'])
def detailPostAPI(request, post_id,*args,**kwargs):
    status = 404
    try:
        obj = Post.objects.get(id=post_id)
        serialized_data = PostSerializer(obj)
        status = 200
        return Response(serialized_data.data, status=status)
    except:
        return Response({"message":"NotFound"}, status=status)

"""
REST API for fetching feeds detail
"""
@permission_classes([IsAuthenticated])
@api_view(['POST','DELETE'])
def deletePostAPI(request, post_id,*args,**kwargs):
    try:
        obj = Post.objects.get(id=post_id)
        if request.user == obj.user:
            obj.delete()
            return Response({"message":"deleted!"})
        else:
            return Response({"message":"Forbidden action"},status=403)      
    except:
        return Response({"message":"NotFound"},status = 404)

"""
REST API for operations on Post
"""
@permission_classes([IsAuthenticated])
@api_view(['POST',])
def ActionOnPostAPI(request,*args,**kwargs):
    serializedAction = PostActionSerializer(data = request.data)
    if serializedAction.is_valid(raise_exception=True):
        data = serializedAction.validated_data
        id = data.get("id")
        action = data.get("action")
        try:
            obj = Post.objects.get(id=id)
        except:
            return Response({"message":"POST NotFound"},status=404)
        if action == 'like':
            if Like.objects.filter(user=request.user,post=obj).count() == 0:
                obj.likes.add(request.user)
                return Response({"message":"Liked!"},status=200)
            else:
                return Response({"message":"already liked !"},status=200) 
        elif action == 'unlike':
            if Like.objects.filter(user=request.user,post=obj).count() > 0:
                obj.likes.remove(request.user)
                return Response({"message":"UnLiked!"},status=200)
            else:
                return Response({"message":"already unliked !"},status=200) 
        elif action == 'repost':
            Post.objects.create(
                og_post = obj,
                user = request.user, 
                content = ""
            )
            return Response({"message":"Reposted!"},status=201)
        else:
            return Response({"message": f"invalid action {action}"},status=400)                 
    else:
        return Response({"message":"INVALID REQUEST"},status = 400)
