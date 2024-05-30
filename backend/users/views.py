from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
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
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return Response({ "detail": "Logged successfully." }, status=status.HTTP_200_OK)
        else:
            return Response({ "error": "Could not authenticate." }, status=status.HTTP_401_UNAUTHORIZED)

class LogOutView(APIView):
    def post(request):
        logout(request)
        return Response({ "detail": "Logged out successfully." }, status=status.HTTP_200_OK)