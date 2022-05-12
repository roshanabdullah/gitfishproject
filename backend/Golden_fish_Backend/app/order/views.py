from .models import *
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from common.utils import create_message, error_handler
from rest_framework.response import Response
from rest_framework import viewsets, status
from cart.models import Cart
from cart.serializers import CartSerializer
from common.secrets import Secrets
from users.models import Address


secrets_obj = Secrets()


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    # permission_classes = (IsAuthenticated,)
    permission_classes_by_action = {'create': [IsAuthenticated],
                                    'list': [IsAuthenticated], }

    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]

    def create(self, request):
        try:
            serializer = OrderSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                # return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(create_message(message="created successfullly", data=serializer.data), status=status.HTTP_201_CREATED)

            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(create_message(message="Not creatad", error=True, error_messages=error_handler(serializer.errors)), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(create_message(error=True, message=e, data=[]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class OrderDetailsViewSet(viewsets.ModelViewSet):
    queryset = OrderDetails.objects.all()
    serializer_class = OrderDetailsSerializer
    # permission_classes = (IsAuthenticated,)
    permission_classes_by_action = {'create': [IsAuthenticated],
                                    'list': [IsAuthenticated], }

    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]

    def create(self, request):
        try:
            serializer = OrderDetailsSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                # return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(create_message(message="created successfullly", data=serializer.data), status=status.HTTP_201_CREATED)

            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(create_message(message="Not creatad", error=True, error_messages=error_handler(serializer.errors)), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(create_message(error=True, message=e, data=[]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class OrderLogsViewSet(viewsets.ModelViewSet):
    queryset = OrderLogs.objects.all()
    serializer_class = OrderLogsSerializer
    # permission_classes = (IsAuthenticated,)
    permission_classes_by_action = {'create': [IsAuthenticated],
                                    'list': [IsAuthenticated], }

    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]

    def create(self, request):
        try:
            serializer = OrderLogsSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                # return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(create_message(message="created successfullly", data=serializer.data), status=status.HTTP_201_CREATED)

            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(create_message(message="Not creatad", error=True, error_messages=error_handler(serializer.errors)), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(create_message(error=True, message=e, data=[]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def place_order(self, request):

        branch = request.data.get('branch')

        order_type = request.data.get('order_type')

        if order_type == 3 and Address.objects.filter(user=request.user).exists() != True:
            return Response(create_message(message="delivery address not provided"), status=status.HTTP_200_OK)

        # if Order.objects.filter(user=request.user, order_status=True).exists():
        #     return Response(create_message(message="you already have a active order"), status=status.HTTP_200_OK)

        try:
            cart = Cart.objects.filter(user=request.user, active=True)
            if cart:
                internal_id = secrets_obj.get_random_keys('password')

                Order.objects.create(
                    user=request.user, internal_id=internal_id, branch_id=branch, order_type=order_type)

                order_id = Order.objects.filter(
                    user=request.user, internal_id=internal_id).first()

                total = 0
                for each_item in cart:
                    OrderLogs.objects.create(created_by=request.user, order=order_id, product=each_item.item,
                                             item_price=each_item.item.price, internal_id=internal_id, quantity=each_item.quantity)
                    total += each_item.item.price * each_item.quantity
                    each_item.active = False
                    each_item.save()

                order_id.total = total
                order_id.save()

                serializer = OrderSerializer(order_id, many=False)

                return Response(create_message(message="Placed order successfully", data=serializer.data), status=status.HTTP_201_CREATED)

            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(create_message(message="Sorry no item in the Cart"), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(create_message(error=True, message=e, data=[]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
