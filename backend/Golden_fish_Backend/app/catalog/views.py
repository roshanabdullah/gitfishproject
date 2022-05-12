from .models import *
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from common.utils import create_message, error_handler
from rest_framework.response import Response
from rest_framework import viewsets, status
from django_filters.rest_framework import DjangoFilterBackend


class ParentCategoryViewSet(viewsets.ModelViewSet):
    queryset = ParentCategory.objects.all()
    serializer_class = ParentCategorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']
    # permission_classes = (IsAuthenticated,)
    permission_classes_by_action = {'create': [IsAdminUser],
                                    'list': [AllowAny], }

    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]

    def create(self, request):
        try:
            serializer = ParentCategorySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                # return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(create_message(message="created successfullly", data=serializer.data), status=status.HTTP_201_CREATED)

            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(create_message(message="Not creatad", error=True, error_messages=error_handler(serializer.errors)), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(create_message(error=True, message=e, data=[]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = (IsAuthenticated,)
    permission_classes_by_action = {'create': [IsAdminUser],
                                    'list': [AllowAny], }

    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]

    def create(self, request):
        try:
            serializer = CategorySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                # return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(create_message(message="created successfullly", data=serializer.data), status=status.HTTP_201_CREATED)

            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(create_message(message="Not creatad", error=True, error_messages=error_handler(serializer.errors)), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(create_message(error=True, message=e, data=[]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    # permission_classes = (IsAuthenticated,)
    permission_classes_by_action = {'create': [IsAdminUser],
                                    'list': [AllowAny], }

    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]

    def create(self, request):
        try:
            serializer = ItemSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                # return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(create_message(message="created successfullly", data=serializer.data), status=status.HTTP_201_CREATED)

            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(create_message(message="Not creatad", error=True, error_messages=error_handler(serializer.errors)), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(create_message(error=True, message=e, data=[]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
