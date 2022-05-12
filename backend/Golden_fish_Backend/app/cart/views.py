from .models import *
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from common.utils import create_message, error_handler
from rest_framework.response import Response
from rest_framework import viewsets, status
from catalog.serializers import ItemSerializer
from users.models import Address
from users.serializers import AddressSerializer


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    # permission_classes = (IsAuthenticated,)
    permission_classes_by_action = {'create': [IsAuthenticated],
                                    'list': [IsAuthenticated], }

    def get_queryset(self):
        user = self.request.user
        print("user   ", user)
        return Cart.objects.filter(user=user, active=True)

    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]

    def create(self, request):
        try:
            serializer = CartSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                # return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(create_message(message="created successfullly", data=serializer.data), status=status.HTTP_201_CREATED)

            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(create_message(message="Not creatad", error=True, error_messages=error_handler(serializer.errors)), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(create_message(error=True, message=e, data=[]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def checkout(self, request):
        try:
            user_cart = self.get_queryset()
            serializer = CheckoutSerializer(user_cart, many=True)
            total_price = 0
            # items = []
            for each_item in user_cart:
                # items.append(each_item.item)
                total_price += each_item.item.price * each_item.quantity

            # items_se = ItemSerializer(items, many=True)
            addres = Address.objects.filter(user=request.user)
            address_data = AddressSerializer(addres, many=True)
            checkout_data = {
                "total_price": total_price,
                "cart": serializer.data,
                "address": address_data.data
            }
            return Response(checkout_data, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(create_message(error=True, message=e, data=[]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
