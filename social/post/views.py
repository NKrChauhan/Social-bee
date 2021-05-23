from .models import Post, Like
from .serializer import PostSerializer, PostActionSerializer, PostDisplaySerializer
from rest_framework.decorators import api_view, authentication_classes, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
# Create your views here.

# def homeview(request, *args, **kwargs):
#     return render(request, 'post/home.html', {})

# REST APIs


@api_view(['GET'])
def listPostAPI(request, *args, **kwargs):
    """
    REST API for fetching feeds at home page
    """
    posts = Post.objects.all()
    serialized_data = PostDisplaySerializer(posts, many=True)
    return Response(serialized_data.data, status=200)


@api_view(['POST'])
@authentication_classes([JWTAuthentication, ])
@permission_classes([IsAuthenticated, ])
def creationPostAPI(request, *args, **kwargs):
    """
    REST API for creating the post
    """
    serailized_obj = PostSerializer(data=request.data)
    if serailized_obj.is_valid(raise_exception=True):
        serailized_obj.save(user=request.user)
        return Response(serailized_obj.data, status=201)
    else:
        return Response({"message": "the form data is overlimit or null"}, status=400)


@api_view(['GET'])
def detailPostAPI(request, post_id, *args, **kwargs):
    """
    REST API for fetching feeds detail
    """
    status = 404
    try:
        obj = Post.objects.get(id=post_id)
        serialized_data = PostDisplaySerializer(obj)
        status = 200
        return Response(serialized_data.data, status=status)
    except:
        return Response({"message": "NotFound"}, status=status)


@api_view(['POST', 'DELETE'])
@authentication_classes([JWTAuthentication, ])
@permission_classes([IsAuthenticated, ])
def deletePostAPI(request, post_id, *args, **kwargs):
    """
    REST API for fetching feeds detail
    """
    try:
        obj = Post.objects.get(id=post_id)
        if request.user == obj.user:
            obj.delete()
            return Response({"message": "deleted!"})
        else:
            return Response({"message": "Forbidden action"}, status=403)
    except:
        return Response({"message": "NotFound"}, status=404)


@api_view(['POST', ])
@authentication_classes([JWTAuthentication, ])
@permission_classes([IsAuthenticated, ])
def ActionOnPostAPI(request, *args, **kwargs):
    """
    REST API for operations on Post
    """
    serializedAction = PostActionSerializer(data=request.data)
    if serializedAction.is_valid(raise_exception=True):
        data = serializedAction.validated_data
        id = data.get("id")
        action = data.get("action")
        try:
            obj = Post.objects.get(id=id)
        except:
            return Response({"message": "POST NotFound"}, status=404)
        if action == 'like':
            if Like.objects.filter(user=request.user, post=obj).count() == 0:
                obj.likes.add(request.user)
                return Response({"message": "Liked!"}, status=200)
            else:
                return Response({"message": "already liked !"}, status=200)
        elif action == 'unlike':
            if Like.objects.filter(user=request.user, post=obj).count() > 0:
                obj.likes.remove(request.user)
                return Response({"message": "UnLiked!"}, status=200)
            else:
                return Response({"message": "already unliked !"}, status=200)
        elif action == 'repost':
            Post.objects.create(
                og_post=obj,
                user=request.user,
                content=""
            )
            return Response({"message": "Reposted!"}, status=201)
        else:
            return Response({"message": f"invalid action {action}"}, status=400)
    else:
        return Response({"message": "INVALID REQUEST"}, status=400)
