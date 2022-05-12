from .models import Franchise
from rest_framework import serializers


class FranchiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Franchise
        fields = '__all__'
