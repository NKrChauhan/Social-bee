from .views import (
    listPostAPI,
    creationPostAPI,
    detailPostAPI,
    deletePostAPI,
    ActionOnPostAPI
)

from django.urls import path

urlpatterns = [
    # path('', homeview),
    path('feeds/', listPostAPI),
    path('feeds/<str:username>/', listPostAPI),
    path('post-create/', creationPostAPI),
    path('post-delete/<int:post_id>/', deletePostAPI),
    path('post-detail/<int:post_id>/', detailPostAPI),
    path('post-action/', ActionOnPostAPI),
]
