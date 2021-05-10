from django.shortcuts import render
from django.http import JsonResponse
from .models import Post
from .serializer import PostSerializer
from .forms import PostForm
from django.contrib.auth.decorators import login_required
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

@login_required
def creationAPI(request):
    """
    REST API for creating the post
    """
    form = PostForm(request.POST or None)
    if request.is_ajax():
        if form.is_valid():
            obj = form.save(commit=False)
            obj.user = request.user
            obj.save()
            serailized_obj = PostSerializer(obj)
            return JsonResponse(serailized_obj.data,status=201)
        else :
            # forms.errors
            return JsonResponse({"message":"the form data is overlimit or null"},status=400)
    else:
        return JsonResponse({"message":"the call was invalid ajax request."},status=500)

def detailAPI(request, pk):
    """
    REST API for fetching feeds detail
    """
    post = Post.objects.get(pk=pk)
    data = {
        "id": id,
    }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except:
        data['message'] = "Not found"
        status = 404
    return JsonResponse(data, status=status)
