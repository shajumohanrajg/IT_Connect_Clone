from django.urls import path 
from .views import *


urlpatterns = [
    path('status',status_list.as_view(),name='status'),
    path('status/<pk>',status_edit.as_view(),name='status_edit'),

    path('light',light_list.as_view(),name='light'),
    path('light/<pk>',light_edit.as_view(),name='light'),


    path('material',material_list.as_view(),name='material'),
    path('material/<pk>',material_list.as_view(),name='material'),

    path('brandlocation',brandlocation_list.as_view(),name='brandlocation'),
    path('brandlocation/<pk>',brandlocation_edit.as_view(),name='brandlocation'),

    path('vendormagnt',vendormagnt_list.as_view(),name='vendormagnt'),
    path('vendormagnt/<pk>',vendormagnt_edit.as_view(),name='vendormagnt'),

    path('brandtype',brandtype_list.as_view(),name='brandtype'),
    path('brandtype/<pk>',brandtype_edit.as_view(),name='brandtype'),

    path('brand_mgmt',brand_mgmt_list.as_view(),name='brand_mgmt'),
    path('brand_mgmt/<pk>',brand_mgmt_edit.as_view(),name='brand_mgmt'),

    path('class_mgmt',class_mgmt_list.as_view(),name='class_mgmt'),
    path('class_mgmt/<pk>',class_mgmt_edit.as_view(),name='class_mgmt'),

    path('showroom_mgmt',showroom_mgmt_list.as_view(),name='showroom_mgmt'),
    path('showroom_mgmt/<pk>',showroom_mgmt_edit.as_view(),name='showroom_mgmt'),

    path('degreeimage_mgnt',degreeimage_mgnt_list.as_view(),name='degreeimage_mgnt'),
    path('degreeimage_mgnt/<pk>',degreeimage_mgnt_edit.as_view(),name='degreeimage_mgnt'),

    path('floor_mgnt',floor_mgnt_list.as_view(),name='floor_mgnt'),
    path('floor_mgnt/<pk>',floor_mgnt_edit.as_view(),name='floor_mgnt'),

    path('outlet_media_form',outlet_media_form_list.as_view(),name='outlet_media_form'),
    path('outlet_media_form/<pk>',outlet_media_form_edit.as_view(),name='outlet_media_form'),

    path('add_advertisement_form',add_advertisement_form_list.as_view(),name='add_advertisement_form'),
    path('add_advertisement_form/<pk>',add_advertisement_form_edit.as_view(),name='add_advertisement_form'),

    # path('status',status_edit.as_view(),name='status'),
    # path('status/<pk>',status_edit.as_view(),name='status_edit'),
]