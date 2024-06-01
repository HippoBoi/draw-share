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
from .serializers import UserSerializer

@api_view(["POST"])
def register_user(request):
    if (request.method == "POST"):
        serializer = UserSerializer(data=request.data)

        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

class LogInView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user_model = get_user_model()

        try:
            user = user_model.objects.get(email=email)
            if (user.check_password(password)):
                user_data = {
                    "username": user.username,
                    "email": user.email,
                    "picture": user.picture.url if user.picture else None
                }
                login(request, user)
                return Response({ "detail": "Logged successfully.", "user": user_data }, status=status.HTTP_200_OK)
            else:
                return Response({ "error": "Couldn't validate credentials." }, status=status.HTTP_401_UNAUTHORIZED)
        except user_model.DoesNotExist:
            return Response({ "error": "Couldn't validate credentials." }, status=status.HTTP_401_UNAUTHORIZED)

class LogOutView(APIView):
    def post(request):
        logout(request)
        return Response({ "detail": "Logged out successfully." }, status=status.HTTP_200_OK)