from django.contrib.auth import login, logout, get_user_model
from rest_framework import status, serializers
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User
from .serializers import UserSerializer

@api_view(["POST"])
def register_user(request):
    if (request.method == "POST"):
        serializer = UserSerializer(data=request.data)

        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetail(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        user_data = {
            "username": user.username,
            "email": user.email,
            "picture": user.picture.url if user.picture else None
        }
        return Response(user_data, status=status.HTTP_200_OK)

class PublicUserDetail(APIView):
    def get(self, request, username):
        try:
            user = User.objects.get(username=username)
            user_data = UserSerializer(user).data
            return Response(user_data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error" : "Couldn't find user"}, status=status.HTTP_404_NOT_FOUND)

class CustomTokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data.update({
            "user": {
                "username": self.user.username,
                "email": self.user.email,
                "picture": self.user.picture.url if self.user.picture else None
            }
        })
        return data

class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer