from django.contrib import admin
from .models import *
# Register your models here.

class adminLoginClass(admin.ModelAdmin):
    list_display=("id","name","email","password")
    list_filter=("id",)
    search_fields=("username__startswith",)
admin.site.register(adminLogin, adminLoginClass)

class customerDataClass(admin.ModelAdmin):
    list_display=("customer_id","fname","lname","customer_email")
    list_filter=("customer_id",)
    search_fields=("customer_id__startswith",)
admin.site.register(customerData, customerDataClass)

class branchAdmin(admin.ModelAdmin):
    list_display=("branch_id","branch_name","branch_address","branch_code")
    list_filter=("branch_id",)
    search_fields=("branch_name__startswith",)
admin.site.register(branches, branchAdmin)


