from .models import *
from rest_framework import serializers


class OrderSerializer(serializers.ModelSerializer):

    payment_type = serializers.SerializerMethodField('get_payment_type')
    order_type = serializers.SerializerMethodField('get_order_type')

    def get_payment_type(self, obj):
        if obj.payment_type == 1:
            return 'CASH'
        elif obj.payment_type == 2:
            return "CREDIT CARD"
        elif obj.payment_type == 3:
            return "DEBIT CARD"

    def get_order_type(self, obj):
        if obj.payment_type == 1:
            return 'TAKEAWAY'
        elif obj.payment_type == 2:
            return "DINE"
        elif obj.payment_type == 3:
            return "DELIVERY"

    class Meta:
        model = Order
        fields = '__all__'


class OrderDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetails
        fields = '__all__'


class OrderLogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderLogs
        fields = '__all__'
