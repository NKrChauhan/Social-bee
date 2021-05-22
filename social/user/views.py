import rest_framework
from rest_framework.response import Response
from .serializers import UserSerializerLogin
from django.contrib.auth import login, authenticate, logout, get_user_model
# Create your views here.


def login(request, *args, **kwargs):
    serialized_data = UserSerializerLogin(data=request.data)
    if(serialized_data.is_valid(raise_exception=True)):
        data = serialized_data.validated_data
        u = authenticate(email=data.get("email"),
                         password=data.get("password"))
        if u is not None:
            login(request, u)
            return Response({"message": "logged in successfully"}, status=200)
        else:
            return Response({"message": "try again"}, status=401)


def register(request, *args, **kwargs):

    return Response({"message": "registered successfully"}, status=200)


def logout(request, *args, **kwargs):

    return Response({"message": "logged out successfully"}, status=200)
