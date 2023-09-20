from django.shortcuts import render

# Create your views here.  
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import viewsets 


# class status_list(viewsets.ModelViewSet):
#     serializer_class = status_serializer
#     queryset = status_management.objects.all()

#     def get_queryset(self):
#         # return self.queryset.filter(created_by=self.request.user)
#          return self.queryset.filter()
    
#     def perform_create(self, serializer):
#         serializer.save(created_by=self.request.user)
    
#     def perform_update(self, serializer):
#         obj = self.get_object()

#         if self.request.user != obj.created_by:
#             raise PermissionDenied('Wrong object owner')
    
#         serializer.save()
class status_list(generics.ListCreateAPIView):
    serializer_class = status_serializer
    queryset = status_management.objects.all()
    
class status_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = status_serializer
    queryset = status_management.objects.all()


class light_list(generics.ListCreateAPIView):
    serializer_class = light_type_mgmt_serializer
    queryset = light_type_mgmt.objects.all()

class light_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = light_type_mgmt_serializer
    queryset = light_type_mgmt.objects.all()



class material_list(generics.ListCreateAPIView):
    serializer_class = material_type_mgmt_serializer
    queryset = material_type_mgmt.objects.all()

class material_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = material_type_mgmt_serializer
    queryset = material_type_mgmt.objects.all()


class brandlocation_list(generics.ListCreateAPIView):
    serializer_class = brandlocation_type_mgmt_serializer
    queryset = brandlocation_type_mgmt.objects.all()

class  brandlocation_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = brandlocation_type_mgmt_serializer
    queryset = brandlocation_type_mgmt.objects.all()



# class brandlocation_list(generics.ListCreateAPIView):
#     serializer_class = brandlocation_type_mgmt_serializer
#     queryset = brandlocation_type_mgmt.objects.all()

# class brandlocation_edit(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = brandlocation_type_mgmt_serializer
#     queryset = brandlocation_type_mgmt.objects.all()


class vendormagnt_list(generics.ListCreateAPIView):
    serializer_class = Vendor_mgmt_serializer
    queryset = Vendor_mgmt.objects.all()

class vendormagnt_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = Vendor_mgmt_serializer
    queryset = Vendor_mgmt.objects.all()


class brandtype_list(generics.ListCreateAPIView):
    serializer_class = brandtypes_mgmt_serializer
    queryset = brandtypes_mgmt.objects.all()

class brandtype_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = brandtypes_mgmt_serializer
    queryset = brandtypes_mgmt.objects.all()


class brand_mgmt_list(generics.ListCreateAPIView):
    serializer_class = brand_mgmt_serializer
    queryset = brand_mgmt.objects.all()

class brand_mgmt_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = brand_mgmt_serializer
    queryset = brand_mgmt.objects.all()


class class_mgmt_list(generics.ListCreateAPIView):
    serializer_class = class_mgmt_serializer
    queryset = class_mgmt.objects.all()

class class_mgmt_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = class_mgmt_serializer
    queryset = class_mgmt.objects.all()

class showroom_mgmt_list(generics.ListCreateAPIView):
    serializer_class = showroom_mgmt_serializer
    queryset = showroom_mgmt.objects.all()

class showroom_mgmt_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = showroom_mgmt_serializer
    queryset = showroom_mgmt.objects.all()


class degreeimage_mgnt_list(generics.ListCreateAPIView):
    serializer_class = degreeimage_mgnt_serializer
    queryset = degreeimage_mgnt.objects.all()

class degreeimage_mgnt_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = degreeimage_mgnt_serializer
    queryset = degreeimage_mgnt.objects.all()



class floor_mgnt_list(generics.ListCreateAPIView):
    serializer_class = floor_mgnt_serializer
    queryset = floor_mgnt.objects.all()

class floor_mgnt_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = floor_mgnt_serializer
    queryset = floor_mgnt.objects.all()



class outlet_media_form_list(generics.ListCreateAPIView):
    serializer_class = outlet_media_form_serializer
    queryset = outlet_media_form.objects.all()

class outlet_media_form_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = outlet_media_form_serializer
    queryset = outlet_media_form.objects.all()


class add_advertisement_form_list(generics.ListCreateAPIView):
    serializer_class = add_advertisement_serializer
    queryset = add_advertisement.objects.all()

class add_advertisement_form_edit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = add_advertisement_serializer
    queryset = add_advertisement.objects.all()