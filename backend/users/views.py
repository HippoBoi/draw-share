from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout, get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer

@api_view(["POST"])
def register_user(request):
    if (request.method == "POST"):
        serializer = UserSerializer(data=request.data)

        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogInView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user_model = get_user_model()

        try:
            user = user_model.objects.get(email=email)
            if (user.check_password(password)):
                userData = {
                    "username": user.username,
                    "email": user.email,
                    "picture": user.picture.url if user.picture else None
                }
                login(request, user)
                return Response({ "detail": "Logged successfully.", "user": userData }, status=status.HTTP_200_OK)
            else:
                return Response({ "error": "Couldn't validate credentials." }, status=status.HTTP_401_UNAUTHORIZED)
        except user_model.DoesNotExist:
            return Response({ "error": "Couldn't validate credentials." }, status=status.HTTP_401_UNAUTHORIZED)

class LogOutView(APIView):
    def post(request):
        logout(request)
        return Response({ "detail": "Logged out successfully." }, status=status.HTTP_200_OK)