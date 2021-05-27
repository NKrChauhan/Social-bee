from .models import Post, Like
from .serializer import PostSerializer, PostActionSerializer, PostDisplaySerializer
from rest_framework.decorators import api_view, authentication_classes, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
# Create your views here.

# def homeview(request, *args, **kwargs):
#     return render(request, 'post/home.html', {})

# REST APIs


@api_view(['GET'])
@permission_classes([AllowAny])
def listPostAPI(request, *args, **kwargs):
    """
    REST API for fetching feeds at home page
    """
    posts = Post.objects.all()
    serialized_data = PostDisplaySerializer(posts, many=True)
    return Response(serialized_data.data, status=status.HTTP_200_OK)


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
        return Response(serailized_obj.data, status=status.HTTP_201_CREATED)
    else:
        return Response({"message": "the form data is overlimit or null"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def detailPostAPI(request, post_id, *args, **kwargs):
    """
    REST API for fetching feeds detail
    """
    try:
        obj = Post.objects.get(id=post_id)
        serialized_data = PostDisplaySerializer(obj)
        return Response(serialized_data.data, status=status.HTTP_200_OK)
    except:
        return Response({"message": "NotFound"}, status=status.HTTP_404_NOT_FOUND)


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
            return Response({"message": "Forbidden action"}, status=status.HTTP_403_FORBIDDEN)
    except:
        return Response({"message": "NotFound"}, status=status.HTTP_404_NOT_FOUND)


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
            return Response({"message": "POST NotFound"}, status=status.HTTP_404_NOT_FOUND)
        if action == 'like':
            if Like.objects.filter(user=request.user, post=obj).count() == 0:
                obj.likes.add(request.user)
                return Response({"message": "Liked!"}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "already liked !"}, status=status.HTTP_200_OK)
        elif action == 'unlike':
            if Like.objects.filter(user=request.user, post=obj).count() > 0:
                obj.likes.remove(request.user)
                return Response({"message": "UnLiked!"}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "already unliked !"}, status=status.HTTP_200_OK)
        elif action == 'repost':
            Post.objects.create(
                og_post=obj,
                user=request.user,
                content=""
            )
            return Response({"message": "Reposted!"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": f"invalid action {action}"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message": "INVALID REQUEST"}, status=status.HTTP_400_BAD_REQUEST)
