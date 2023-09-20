from django.shortcuts import render

# Create your views here.  
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import viewsets 
from django.contrib.auth.models import User


class jobfor_list(generics.ListCreateAPIView):
    serializer_class = jobfor_serializer
    queryset = jobfor.objects.all()


class jobfor_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = jobfor_serializer
    queryset = jobfor.objects.all()


class jobtype_list(generics.ListCreateAPIView):
    serializer_class = jobtype_serializer
    queryset = jobtype.objects.all()


class jobtype_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = jobtype_serializer
    queryset = jobtype.objects.all()


class job_list(generics.ListCreateAPIView):
    serializer_class = job_serializer
    queryset = job.objects.all()


class job_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = job_serializer
    queryset = job.objects.all()


class designtype_list(generics.ListCreateAPIView):
    serializer_class = designtype_serializer
    queryset = designtype.objects.all()


class designtype_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = designtype_serializer
    queryset = designtype.objects.all()

class uesr(generics.ListAPIView):
    serializer_class = user_serializer
    queryset = User.objects.all()