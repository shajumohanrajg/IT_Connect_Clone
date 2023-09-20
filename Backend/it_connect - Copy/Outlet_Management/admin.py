from django.contrib import admin

# Register your models here.
from .models import *

from import_export.admin import ImportExportModelAdmin


class showroom_mgmtAdmin(ImportExportModelAdmin):

    class Meta:

        model =showroom_mgmt()

        Field = ('id',)

admin.site.register(showroom_mgmt, showroom_mgmtAdmin)



# admin.site.register(showroom_mgmt, showroom_mgmtAdmin)
admin.site.register(status_management)
admin.site.register(light_type_mgmt)
admin.site.register(material_type_mgmt)
admin.site.register(brandlocation_type_mgmt)
admin.site.register(Vendor_mgmt)
admin.site.register(brandtypes_mgmt)
admin.site.register(brand_mgmt)
admin.site.register(class_mgmt)
# admin.site.register(showroom_mgmt)
admin.site.register(degreeimage_mgnt)
admin.site.register(floor_mgnt)

# class floor_mgntAdmin(admin.ModelAdmin): # new
#      readonly_fields = ['img_preview']

# admin.site.register(floor_mgnt, floor_mgntAdmin) # 