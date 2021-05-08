from .views import listview
from django.urls import path

urlpatterns = [
    path('', listview),
]
