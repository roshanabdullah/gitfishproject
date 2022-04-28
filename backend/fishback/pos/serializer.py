from rest_framework import serializers
from .models import *

class branchSerializer(serializers.ModelSerializer):
    class Meta:
        model=branches
        fields=('branch_id','branch_name','branch_address','branch_code')