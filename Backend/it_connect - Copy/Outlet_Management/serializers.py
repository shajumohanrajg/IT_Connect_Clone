from rest_framework import serializers
from .models import *

class status_serializer(serializers.ModelSerializer):
    class Meta:
        model = status_management
        fields = '__all__'



class light_type_mgmt_serializer(serializers.ModelSerializer):
    class Meta:
        model = light_type_mgmt
        fields = '__all__'

class material_type_mgmt_serializer(serializers.ModelSerializer):
    class Meta:
        model = material_type_mgmt
        fields = '__all__'

class brandlocation_type_mgmt_serializer(serializers.ModelSerializer):
    class Meta:
        model = brandlocation_type_mgmt
        fields = '__all__'


class Vendor_mgmt_serializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor_mgmt
        fields = '__all__'


class brandtypes_mgmt_serializer(serializers.ModelSerializer):
    class Meta:
        model = brandtypes_mgmt
        fields = '__all__'

class brand_mgmt_serializer(serializers.ModelSerializer):
    class Meta:
        model = brand_mgmt
        fields = '__all__'

class class_mgmt_serializer(serializers.ModelSerializer):
    class Meta:
        model = class_mgmt
        fields = '__all__'

class showroom_mgmt_serializer(serializers.ModelSerializer):
    class Meta:
        model = showroom_mgmt
        fields = '__all__'

class degreeimage_mgnt_serializer(serializers.ModelSerializer):
    class Meta:
        model = degreeimage_mgnt
        fields = '__all__'


class floor_mgnt_serializer(serializers.ModelSerializer):
    class Meta:
        model = floor_mgnt
        fields = '__all__'

class outlet_media_form_serializer(serializers.ModelSerializer):
    class Meta:
        model = outlet_media_form
        fields = '__all__'

class add_advertisement_serializer(serializers.ModelSerializer):
    class Meta:
        model = add_advertisement
        fields = '__all__'