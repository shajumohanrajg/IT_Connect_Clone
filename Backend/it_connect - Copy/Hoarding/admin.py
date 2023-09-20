from django.contrib import admin

# Register your models here.
from .models import hoarding,add_advertisement

admin.site.register(hoarding)
admin.site.register(add_advertisement)
