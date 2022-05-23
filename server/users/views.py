from django.shortcuts import render

# Create your views here.
# users/views.py

from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from django.contrib import auth
import jwt, datetime
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import permissions
from .serializers import UserRegistrationSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect


class UserRegistrationView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request):
        username = request.data['username']
        password = request.data['password']

        found_user = User.objects.filter(username = username).first()

        if found_user is None:
            raise AuthenticationFailed('User could not be found')
        
        if not found_user.check_password(password):
            raise AuthenticationFailed('Incorrect Password!')
        
        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                payload = {
                    'id': found_user.id,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                    'iat': datetime.datetime.utcnow()
                }
                token = jwt.encode(payload, 'secret', algorithm='HS256')
                response = Response()
                response.data = {
                    'jwt': token
                }
                auth.login(request, user)
                return response
            else:
                return Response({'error': 'Error authenticating!' })
        except:
            return Response({ 'error': 'Could not log in'})

        # payload = {
        #     'id': found_user.id,
        #     'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        #     'iat': datetime.datetime.utcnow()
        # }
        # token = jwt.encode(payload, 'secret', algorithm='HS256')

        # response = Response()

        # response.data = {
        #     'jwt': token
        # }
        # return response

class UserView(APIView):
    permission_classes = (permissions.AllowAny, )  
    def post(self, request):
        if request.data == {}: 
            raise AuthenticationFailed('Unauthenticated')  
        try:
            token = request.data['token']
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        user = User.objects.filter(id = payload['id']).first()
        serializer = UserRegistrationSerializer(user)
        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        try:
            auth.logout(request)
            return Response({ 'success': 'Logged Out' })
        except:
            return Response({ 'error': 'Error logging out.'})
        # response = Response()
        # response.delete_cookie('jwt')
        # response.data= {
        #     "message": "success"
        # }
        # return response
