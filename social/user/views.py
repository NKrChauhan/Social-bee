import rest_framework
from rest_framework.response import Response
from .serializers import UserSerializerLogin, UserSerializerRegister
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request, *args, **kwargs):
    serialized_data = UserSerializerLogin(data=request.data)
    if(serialized_data.is_valid(raise_exception=True)):
        data = serialized_data.validated_data
        u = authenticate(email=data.get("email"),
                         password=data.get("password"))
        if u is not None:
            refresh = RefreshToken.for_user(u)
            res = {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
            return Response(res, status=200)
        else:
            return Response({"message": "try again"}, status=401)


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request, *args, **kwargs):
    serializer = UserSerializerRegister(data=request.data)
    if not serializer.is_valid(raise_exception=True):
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    user = serializer.save()
    refresh = RefreshToken.for_user(user)
    res = {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }
    return Response(res, status.HTTP_201_CREATED)


@api_view(["POST"])
@authentication_classes([JWTAuthentication, ])
@permission_classes([IsAuthenticated])
def logout(request, *args, **kwargs):
    return Response({"message": "logged out successfully"}, status=200)
