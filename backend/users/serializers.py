from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password", "email", "picture"]
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