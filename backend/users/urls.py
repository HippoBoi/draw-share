from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from . import views

urlpatterns = [
    path("register/", views.register_user, name="register_user"),
    path("user/", views.UserDetail.as_view(), name="user-detail"),
    path("user/<str:username>/", views.get_user_by_name, name="get_user_by_name"),
    path("user/<int:user_id>", views.get_user_by_id, name="get_user_by_id"),
    path("token/", views.CustomTokenView.as_view(), name="token-obtain-pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("post/", views.create_post, name="create_post"),
    path("posts/", views.get_posts, name="get_posts"),
    path("posts/<int:post_id>", views.get_post_by_id, name="get_post_by_id"),
    path("posts/search/", views.get_posts_by_query, name="get_posts_by_query"),
    path("posts/user/<str:username>/", views.get_posts_by_username, name="get_posts_by_username")
]