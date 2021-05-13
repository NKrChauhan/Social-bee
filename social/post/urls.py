from .views import (
    homeview,
    listPostAPI,
    creationPostAPI,
    detailPostAPI,
    deletePostAPI
)

from django.urls import path

urlpatterns = [
    path('', homeview),
    path('feeds/', listPostAPI),
    path('post-create/', creationPostAPI),
    path('post-delete/<int:post_id>/', deletePostAPI),
    path('post-detail/<int:post_id>/', detailPostAPI),
]
