from django.contrib import admin
from django.urls import path, include
from users.views import (
    GoogleLogin, UserProfile, register_api, login_api, logout_api,
    is_authenticated, CustomTokenRefreshView
)
from quests.views import QuestListCreateView, QuestDetailView, TaskListCreateView, TaskDetailView, MediaUploadView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Аутентифікація
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('auth/register/', register_api, name='register_api'),
    path('auth/login/', login_api, name='login_api'),
    path('auth/logout/', logout_api, name='logout_api'),
    path('auth/status/', is_authenticated, name='is_authenticated'),
    path('auth/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('auth/user/profile/', UserProfile.as_view(), name='user_profile'),

    path('api/quests/', QuestListCreateView.as_view(), name='quest_list_create'),
    path('api/quests/<int:pk>/', QuestDetailView.as_view(), name='quest_detail'),
    path('api/tasks/', TaskListCreateView.as_view(), name='task_list_create'),
    path('api/tasks/<int:pk>/', TaskDetailView.as_view(), name='task_detail'),
    path('api/media/', MediaUploadView.as_view(), name='media_upload'),
]
