from winreg import CreateKeyEx
from wsgiref import validate
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from rest_framework.authtoken.models import Token



class accSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateAcc
        fields = ['id','username','email','password'] 
        extra_kwargs = {'password': {'write_only': True}}
        

        
        
    