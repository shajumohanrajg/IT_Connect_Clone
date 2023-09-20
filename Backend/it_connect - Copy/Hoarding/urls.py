from django.urls import path 
from .views import *


urlpatterns = [
    path('hoarding_list',hoarding_list.as_view(),name='hoarding_list'),
    path('hoarding_list/<pk>',hoarding_edit.as_view(),name='hoarding_edit'),

    path('add_advertisement_list',add_advertisement_list.as_view(),name='add_advertisement_list'),
    path('add_advertisement_list/<pk>',add_advertisement_list.as_view(),name='add_advertisement_list_edit'),
]