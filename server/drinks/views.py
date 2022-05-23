from django.shortcuts import render
from django.http import Http404
from .models import Drink
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import DrinkSerializer
from rest_framework import permissions

# Create your views here.

class DrinkList(APIView):
    permission_classes = (permissions.AllowAny, )

    def get_user_drinks_obj(self, username):
        try:
            return Drink.objects.filter(username=username)
        except Drink.DoesNotExist:
            raise Http404

    def get(self, request, username):
        found_drinks = self.get_user_drinks_obj(username)
        serializer = DrinkSerializer(found_drinks, many=True)
        return Response(serializer.data)
    
    def post(self, request, username, format=None):
        serializer = DrinkSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
