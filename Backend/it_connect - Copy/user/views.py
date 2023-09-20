from django.contrib.auth.models import User,Group
from rest_framework import permissions,viewsets
from .serializers import UserSerializers,GroupSerializers# ProductSerializer
# from .models import Product


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializers
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializers
    permission_classes = [permissions.IsAuthenticated]


# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
    # permission_classes = [permissions.IsAuthenticated]