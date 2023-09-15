from rest_framework import serializers
from rest_framework.exceptions import APIException
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from .models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # for any additional fields you'd like to add to the JWT sent back in response
        # add below using the token["field name"] = user.name_of_property
        # token["is_student"] = user.is_student

        token["username"] = user.username
        token["email"] = user.email
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_superuser

        return token


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[
                                   UniqueValidator(queryset=User.objects.all())])

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        # If added new columns through the User model, add them in the fields
        # list as seen below
        fields = ('username', 'password', 'email',
                  'first_name', 'last_name',)

    def create(self, validated_data):

        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],

            # If added new columns through the User model, add them in this
            # create method. Example below:

            # is_student=validated_data['is_student']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user


class OldPassValidator(APIException):
    status_code = 401
    default_detail = {'Incorrect Password' : 'That password is not correct'}

class ChangeUserProfileSerializer(serializers.ModelSerializer):
    oldPass = serializers.CharField(write_only = True, required = True)
    newPass = serializers.CharField(write_only = True, required = False, validators = [validate_password])
    newPassAgain = serializers.CharField(write_only = True, required = False)
    email = serializers.EmailField(required=True)
    
    class Meta:
        model = User
        fields = ('oldPass', 'newPass', 'newPassAgain', 'username', 'first_name', 'last_name', 'email')
        
    def validate(self, passwords):
        try:
            if passwords['newPass'] != passwords['newPassAgain']:
                raise serializers.ValidationError({'newPass' : 'Password fields didn\'t match'})
        except KeyError:
            try:
                del passwords['newPass']
                print ('deleted')
            except KeyError:
                pass
        return passwords
    
    def validate_email (self, email):
        user = self.context['request'].user
        if User.objects.exclude(id=user.id).filter(email=email).exists():
            raise serializers.ValidationError({'Email' : 'This email is already registered to another user!'})
        return email
    
    def validate_username(self, username):
        user = self.context['request'].user
        if User.objects.exclude(id=user.id).filter(username=username).exists():
            raise serializers.ValidationError({'Username' : 'This username is already taken.'})
        return username
        
    def validate_oldPass(self, oldPass):
        user = self.context['request'].user
        if not user.check_password(oldPass):
            raise OldPassValidator
        return oldPass
    
    def update(self, instance, validated_data):
        try:
            instance.set_password(validated_data['newPass'])
        except KeyError:
            print('Pass not updated')
            pass
        try:
            instance.first_name = validated_data['first_name']
        except KeyError:
            print ('First_name not updated')
            pass
        try:
            instance.last_name = validated_data['last_name']
        except KeyError:
            print ('Last_name not updated')
            pass
        try:
            instance.username = validated_data['username']
        except KeyError:
            print ('Username not updated')
            pass
        try:
            instance.email = validated_data['email']
        except KeyError:
            print ('Email not updated')
            pass
        instance.save()
        return instance
    
class ViewUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name',)
    