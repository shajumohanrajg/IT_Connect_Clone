from django.contrib.auth.models import User,Group
from rest_framework import serializers
# from .models import Product


class UserSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url","username","email","is_staff","groups","user_permissions"]


class GroupSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url","name"]


# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = "__all__"
