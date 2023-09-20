from django.urls import path 
from .views import *


urlpatterns = [
    path('jobfor_list',jobfor_list.as_view(),name='jobfor_list'),
    path('jobfor_list/<pk>',jobfor_edit.as_view(),name='jobfor_edit'),

    path('jobtype_list',jobtype_list.as_view(),name='jobtype_list'),
    path('jobtype_list/<pk>',jobtype_edit.as_view(),name='jobtype_edits'),

    path('job_list',job_list.as_view(),name='job_list'),
    path('job_list/<pk>',job_edit.as_view(),name='job_list'),

    path('designtype_list',designtype_list.as_view(),name='designtype_list'),
    path('designtype_list/<pk>',designtype_edit.as_view(),name='designtype_edit'),
    path('user/',uesr.as_view(),name='user'),
    

]

# x