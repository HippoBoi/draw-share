from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from . import views

urlpatterns = [
    path("register/", views.register_user, name="register_user"),
    path("logout/", views.LogOutView.as_view(), name="logout"),
    path("user/", views.UserDetail.as_view(), name="user-detail"),
    path("user/<str:username>/", views.PublicUserDetail.as_view(), name="public-user-detail"),
    path("token/", views.CustomTokenView.as_view(), name="token-obtain-pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh")
]