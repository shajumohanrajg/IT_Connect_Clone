from django.db import models
from Outlet_Management.models import showroom_mgmt
# from user.models import User
# from user.models import User
from django.contrib.auth.models import User


STATUS = (
    ('Inactive', 'Inactive'),
    ('Active', 'Active'),
)
Priority=(
    ('Medium','Medium'),
    ('TOP','TOP'),
    ('Urgent','Urgent')
)

Status = (
    ('Pending','Pending'),
    ('Follow Up','Follow Up'),
    ('Completed','Completed')
)
# Create your models here.
class jobfor(models.Model):
    name = models.CharField(max_length=255,null=True,blank=True)
    status = models.CharField(max_length=255,choices=STATUS)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_jobfor', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_jobfor', on_delete=models.CASCADE)




class jobtype(models.Model):
    jobfor = models.ForeignKey(jobfor, on_delete=models.CASCADE)
    name = models.CharField(max_length=255,null=True,blank=True)
    status = models.CharField(max_length=255,choices=STATUS)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_jobtype', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_jobtype', on_delete=models.CASCADE)

class designtype(models.Model):
    jobfor = models.ForeignKey(jobfor, on_delete=models.CASCADE)
    jobtype = models.ForeignKey(jobtype, on_delete=models.CASCADE)
    name = models.CharField(max_length=255,null=True,blank=True)
    status = models.CharField(max_length=255,choices=STATUS)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_designtype', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_designtype', on_delete=models.CASCADE)


class job(models.Model):
    jobfor = models.ForeignKey(jobfor, on_delete=models.CASCADE)
    jobtype = models.ForeignKey(jobtype, on_delete=models.CASCADE)
    designtype = models.ForeignKey(designtype, on_delete=models.CASCADE)
    showroom  = models.ForeignKey(showroom_mgmt, on_delete=models.CASCADE)
    priority  = models.CharField(max_length=255,choices=Priority)
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=255,choices=Status)
    dead_Line = models.DateTimeField()
    comment = models.TextField(null=True,blank=True)
    created_at= models.DateField(auto_created=True,auto_now_add=True)
    modified_at= models.DateField(auto_created=True,auto_now_add=True,blank=True)
    # created_by = models.ForeignKey(User, related_name='created_job', on_delete=models.CASCADE)
    # modified_by = models.ForeignKey(User, related_name='modified_job', on_delete=models.CASCADE)
