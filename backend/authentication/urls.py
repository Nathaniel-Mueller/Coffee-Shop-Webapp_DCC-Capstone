from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, MyTokenObtainPairView, ChangeUserProfileView, ViewUserProfileView

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ViewUserProfileView.as_view(), name='view_profile'),
    path('profile/edit/', ChangeUserProfileView.as_view(), name='change_profile'),
]
