from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.exceptions import ObjectDoesNotExist
from .models import User, Post
from .serializers import UserSerializer, PostSerializer

@api_view(["POST"])
def register_user(request):
    try:
        serializer = UserSerializer(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["GET"])
def get_user_by_name(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"error" : "Couldn't find user"}, status=status.HTTP_404_NOT_FOUND)
    
    user_data = UserSerializer(user).data
    return Response(user_data, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_user_by_id(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
    except ObjectDoesNotExist:
        return Response({"error": "Couldn't find user"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)

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

@api_view(["POST"])
def create_post(request):
    try:
        user = User.objects.get(username=request.data["username"])
    except ObjectDoesNotExist:
        return Response({ "error": "Couldn't find user." }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    newData = {
        "user": user.pk,
        "title": request.data["title"],
        "description": request.data["description"],
        "image": request.FILES.get("image")
    }

    try:
        serializer = PostSerializer(data=newData)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["GET"])
def get_posts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_post_by_id(request, post_id):
    try:
        posts = Post.objects.get(pk=post_id)
    except ObjectDoesNotExist:
        return Response({"error": "Couldn't find post"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = PostSerializer(posts)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_posts_by_query(request):
    query = request.query_params.get("q", None)
    if query is not None:
        posts = Post.objects.filter(title__icontains=query) | Post.objects.filter(description__icontains=query)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Couldn't find query param"}, status=status.HTTP_400_BAD_REQUEST)