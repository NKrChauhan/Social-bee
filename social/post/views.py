from django.shortcuts import render
from django.http import JsonResponse
from .models import Post
from .serializer import PostSerializer
from .forms import PostForm
# Create your views here.


def homeview(request):
    return render(request, 'post/home.html', {})

# REST APIs


def listAPI(request):
    """
    REST API for fetching feeds at home page
    """
    posts = Post.objects.all()
    serialized_data = PostSerializer(posts, many=True)
    return JsonResponse(serialized_data.data, safe=False)


def creationAPI(request):
    """
    REST API for creating the post
    """
    form = PostForm(request.POST or None)
    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = request.user
        obj.save()
        serailized_obj = PostSerializer(obj)
        return JsonResponse(serailized_obj.data)
