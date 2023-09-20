from rest_framework import serializers
from .models import *

class hoarding_serializer(serializers.ModelSerializer):
    class Meta:
        model = hoarding
        fields = '__all__'



class add_advertisement_serializer(serializers.ModelSerializer):
    class Meta:
        model = add_advertisement
        fields = '__all__'

# c