from .views import homeview, listAPI, creationAPI
from django.urls import path

urlpatterns = [
    path('', homeview),
    path('feeds/', listAPI),
    path('post-create/', creationAPI),
]
