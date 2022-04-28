from django.contrib import admin
from .models import *
# Register your models here.

class AccAdmin(admin.ModelAdmin):
    list_display=("id","username","email","password")
    list_filter=("id",)
    search_fields=("username__startswith",)
admin.site.register(CreateAcc, AccAdmin)

