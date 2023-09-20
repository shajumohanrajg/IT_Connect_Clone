from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class jobfor_serializer(serializers.ModelSerializer):
    class Meta:
        model = jobfor
        fields = '__all__'



class jobtype_serializer(serializers.ModelSerializer):
    class Meta:
        model = jobtype
        fields = '__all__'
        

class designtype_serializer(serializers.ModelSerializer):
    class Meta:
        model = designtype
        fields = '__all__'
        


class job_serializer(serializers.ModelSerializer):
    class Meta:
        model = job
        fields = '__all__'


class user_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
        )
        # fields = (
        #     "username"

        # )