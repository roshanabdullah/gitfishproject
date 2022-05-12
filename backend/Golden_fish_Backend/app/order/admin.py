import imp
from re import I
from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Order)
admin.site.register(OrderDetails)
admin.site.register(OrderLogs)
admin.site.register(Transections)
