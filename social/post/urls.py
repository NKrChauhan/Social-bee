from .views import (
    homeview,
    listPostAPI,
    creationPostAPI,
    detailPostAPI,
    deletePostAPI,
    ActionOnPostAPI
)

from django.urls import path

urlpatterns = [
    path('', homeview),
    path('api/feeds/', listPostAPI),
    path('api/post-create/', creationPostAPI),
    path('api/post-delete/<int:post_id>/', deletePostAPI),
    path('api/post-detail/<int:post_id>/', detailPostAPI),
    path('api/post-action/', ActionOnPostAPI),
]
