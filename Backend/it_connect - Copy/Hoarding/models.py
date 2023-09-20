from django.db import models
from Outlet_Management.models import material_type_mgmt,status_management,brandtypes_mgmt,Vendor_mgmt
from django.contrib.auth.models import User
# Create your models here.


site_typ = (
    ('Rent', 'Rent'),
    ('Own', 'Own'),
)

b_tyep = (
    ('Outdoor', 'Outdoor'),
    ('Mall', 'Mall'),
)

STATUS = (
    ('Inactive', 'Inactive'),
    ('Active', 'Active'),
)
class hoarding(models.Model):
    site_type  = models.CharField(max_length=255,choices = site_typ)
    site_location = models.CharField(max_length=255,blank=True, null= True)
    branding_type = models.CharField(max_length=255,choices = b_tyep)
    branding_location = models.CharField(max_length=255,blank=True, null= True)
    Width = models.CharField(max_length=255,blank=True, null= True)
    height = models.CharField(max_length=255,blank=True, null= True)
    material =  models.ForeignKey(material_type_mgmt, on_delete= models.CASCADE)
    start_Date = models.DateField()
    Rent = models.CharField(max_length=255,blank=True, null= True)
    asset_image = models.ImageField(upload_to ='uploads/')
    document = models.FileField(upload_to='Documents/')
    status = models.CharField(max_length=255,choices = STATUS)
    other_comments = models.TextField(blank=True,null=True)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_hoarding', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_hoarding', on_delete=models.CASCADE)


class add_advertisement(models.Model):
    hoarding = models.ForeignKey(hoarding, on_delete=models.CASCADE)
    # brand  = models.CharField(max_length=255,blank=True, null= True)
    brand = models.ForeignKey(brandtypes_mgmt, on_delete=models.CASCADE)
    model_name = models.CharField(max_length=255,blank=True, null= True)
    vendor = models.ForeignKey(Vendor_mgmt, on_delete=models.CASCADE)
    expiry_on = models.DateField()
    image = models.ImageField(upload_to ='uploads/')
    status = models.TextField(max_length=255,choices=STATUS)
    # created_at= models.DateField(auto_created=True,auto_now_add=True)
    # modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_add_advertisement', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_add_advertisement', on_delete=models.CASCADE)
    


