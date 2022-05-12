from .models import *
from rest_framework import serializers


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['item', 'notes', 'quantity', ]
        depth = 1
