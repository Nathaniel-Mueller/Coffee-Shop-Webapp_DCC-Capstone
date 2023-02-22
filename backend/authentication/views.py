from django.contrib.auth import get_user_model
from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer, ChangeUserProfileSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
User = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

class ChangeUserProfileView(generics.UpdateAPIView):
    
    def get_object(self):
        return User.objects.get(pk=self.request.user.pk)

    permission_classes = (IsAuthenticated,)
    serializer_class = ChangeUserProfileSerializer
    
    