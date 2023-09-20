from django.shortcuts import render

# Create your views here.  
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import viewsets 


class hoarding_list(generics.ListCreateAPIView):
    serializer_class = hoarding_serializer
    queryset = hoarding.objects.all()

class hoarding_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = hoarding_serializer
    queryset = hoarding.objects.all()


class add_advertisement_list(generics.ListCreateAPIView):
    serializer_class = add_advertisement_serializer
    queryset = add_advertisement.objects.all()

class add_advertisement_list(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = add_advertisement_serializer
    queryset = add_advertisement.objects.all()