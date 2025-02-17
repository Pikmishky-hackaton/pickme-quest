from django.contrib import admin
from django.urls import path, include
from users.views import (
    GoogleLogin, UserProfile, register_api, login_api, logout_api,
    is_authenticated, CustomTokenRefreshView
)


urlpatterns = [
    path('admin/', admin.site.urls),

    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('auth/register/', register_api, name='register_api'),
    path('auth/login/', login_api, name='login_api'),
    path('auth/logout/', logout_api, name='logout_api'),
    path('auth/status/', is_authenticated, name='is_authenticated'),
    path('auth/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('auth/user/profile/', UserProfile.as_view(), name='user_profile'),
    path('api/', include('quests.urls')),


]
