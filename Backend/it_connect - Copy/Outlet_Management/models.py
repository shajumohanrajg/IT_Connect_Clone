from django.db import models
from multiselectfield import MultiSelectField
from django.utils.html import mark_safe
# from django.contrib.auth.models import User

visib= (
    ('Vendor', 'Vendor'),
    ('Assets', 'Assets'),
)
STATUS = (
    ('Inactive', 'Inactive'),
    ('Active', 'Active'),
)


STATUS1 = (
    ('Enable', 'Enable'),
    ('Disabled', 'Disabled'),
)
class status_management(models.Model):
    name = models.CharField(max_length=255,blank=True, null=True)
    status = models.CharField(max_length=255,choices = STATUS)
    visibility = MultiSelectField(max_length=30, choices=visib)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_status_management', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_status_management', on_delete=models.CASCADE)



class light_type_mgmt(models.Model):
    name = models.CharField(max_length=255,blank=True, null=True)
    status = models.CharField(max_length=255,choices = STATUS)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_light_type_mgmt', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_light_type_mgmt', on_delete=models.CASCADE)



class material_type_mgmt(models.Model):
    name = models.CharField(max_length=255,blank=True, null=True)
    status = models.CharField(max_length=255,choices = STATUS)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_material_type_mgmt', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_material_type_mgmt', on_delete=models.CASCADE)


class brandlocation_type_mgmt(models.Model):
    name = models.CharField(max_length=255,blank=True, null=True)
    status = models.CharField(max_length=255,choices = STATUS)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_brandlocation_type_mgmt', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_brandlocation_type_mgmt', on_delete=models.CASCADE)

class Vendor_mgmt(models.Model):
    name = models.CharField(max_length=255,blank=True, null=True)
    status = models.CharField(max_length=255,choices = STATUS)
    vendor_comments = models.TextField(blank=True,null=True)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_Vendor_mgmt', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_Vendor_mgmt', on_delete=models.CASCADE)


class brandtypes_mgmt(models.Model):
    name = models.CharField(max_length=255,blank=True, null=True)
    status = models.CharField(max_length=255,choices = STATUS)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_brandtypes_mgmt', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_brandtypes_mgmt', on_delete=models.CASCADE)



class brand_mgmt(models.Model):
    name = models.CharField(max_length=255,blank=True, null=True)
    status = models.CharField(max_length=255,choices = STATUS)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_brand_mgmt', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_brand_mgmt', on_delete=models.CASCADE)


class class_mgmt(models.Model):
    name = models.CharField(max_length=255,blank=True, null=True)
    status = models.CharField(max_length=255,choices = STATUS)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_class_mgmt', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_class_mgmt', on_delete=models.CASCADE)


class showroom_mgmt(models.Model):
    name = models.CharField(max_length=255,blank=True, null=True)
    rsm = models.CharField(max_length=255,blank=True, null=True)
    asm = models.CharField(max_length=255,blank=True, null=True)
    manager = models.CharField(max_length=255,blank=True, null=True)
    cug_no = models.CharField(max_length=255,blank=True, null=True)
    landline = models.CharField(max_length=255,blank=True, null=True)
    e_mail = models.EmailField(null=True,blank=True)
    region = models.CharField(max_length=255,blank=True, null=True)
    state = models.CharField(max_length=255,blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_showroom_mgmt', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_showroom_mgmt', on_delete=models.CASCADE)


class degreeimage_mgnt(models.Model):
    name = models.ForeignKey(showroom_mgmt,on_delete=models.CASCADE,related_name="degree_image")
    url = models.URLField()
    grade = models.CharField(max_length=255,blank=True, null=True)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_degreeimage_mgnt', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_degreeimage_mgnt', on_delete=models.CASCADE)


class floor_mgnt(models.Model):
    name = models.ForeignKey(showroom_mgmt,on_delete=models.CASCADE,related_name="floor")
    floor_image = models.ImageField(upload_to ='uploads/')
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_floor_mgnt', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_floor_mgnt', on_delete=models.CASCADE)



class outlet_media_form(models.Model):

    class_name = models.ForeignKey(class_mgmt,on_delete=models.CASCADE,related_name="class_mgmt")
    showroom  = models.ForeignKey(showroom_mgmt,on_delete=models.CASCADE,related_name="showroom_mgmt")
    branding_type = models.ForeignKey(brandtypes_mgmt,on_delete=models.CASCADE,related_name="brandtypes_mgmt")
    branding_location  = models.ForeignKey(brandlocation_type_mgmt,on_delete=models.CASCADE,related_name="brandlocation_type_mgmt")
    Width = models.CharField(max_length=255,blank=True, null=True)
    Height = models.CharField(max_length=255,blank=True, null=True)
    model_product_name = models.CharField(max_length=255,blank=True, null=True)
    brand = models.ForeignKey(brand_mgmt,on_delete=models.CASCADE,related_name="brand_mgmt_add")
    material = models.ForeignKey(material_type_mgmt,on_delete=models.CASCADE,related_name="material_type_mgmt")
    light_Type = models.ForeignKey(light_type_mgmt,on_delete=models.CASCADE,related_name="light_type_mgmt")
    ad_image= models.ImageField(upload_to ='uploads/')
    # update_at = models.DateField()
    status = models.CharField(max_length=255, choices=STATUS1)
    other_Comments = models.TextField(null=True,blank=True)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_outlet_media_form', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_outlet_media_form', on_delete=models.CASCADE)
    
    



class add_advertisement(models.Model):
    outlet_media = models.ForeignKey(outlet_media_form,on_delete=models.CASCADE)
    asset_image = models.ImageField(upload_to ='uploads/')

    brand = models.ForeignKey(brand_mgmt,on_delete=models.CASCADE,related_name="brand_mgmt")
    model_product_name = models.CharField(max_length=255,blank=True, null=True)
    vendor = models.ForeignKey(Vendor_mgmt,on_delete=models.CASCADE,related_name="degree_image")
    expiry_on = models.DateField()
    ad_status= models.ForeignKey(status_management,on_delete=models.CASCADE,related_name="status_management")
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_add_advertisement', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_add_advertisement', on_delete=models.CASCADE)
  