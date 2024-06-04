from rest_framework import serializers
from .models import User, Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email", "picture"]
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        username = validated_data['username']
        password = validated_data['password']
        email = validated_data['email']
        picture = validated_data.get('picture')

        user = User(
            username = username,
            email = email
        )

        user.set_password(password)
        user.picture = picture

        user.save()

        return user
    
class PostSerializer(serializers.ModelSerializer):
    user_details = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["id", "user", "user_details", "title", "description", "image", "created_at"]
    
    def get_user_details(self, obj):
        return {
            "id": obj.user.id,
            "username": obj.user.username,
            "email": obj.user.email,
            "picture": obj.user.picture.url if obj.user.picture else None
        }
    
    def create(self, validated_data):
        user = validated_data["user"]
        title = validated_data["title"]
        description = validated_data["description"]
        image = validated_data["image"]

        post = Post(
            user=user,
            title=title,
            description=description,
            image = image
        )

        post.save()

        return post