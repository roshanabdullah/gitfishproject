from re import I
from .models import User
from rest_framework import viewsets, status
from .serializers import *

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from common.secrets import Secrets

from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone
from common.utils import create_message, error_handler

secrets_obj = Secrets()

# ViewSets define the view behavior.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                # return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(create_message(message="created successfullly", data=serializer.data), status=status.HTTP_201_CREATED)

            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(create_message(message="Not creatad", error=True, error_messages=error_handler(serializer.errors)), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(create_message(error=True, message=e, data=[]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['post'], detail=True, serializer_class=loginSerializer)
    def login(self, request):
        print("post login ------\n    "*3)
        try:
            serializer = loginSerializer(data=request.data)
            # serializer = UserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            user.last_login = timezone.now()
            user.save()
            token, created = Token.objects.get_or_create(user=user)
            # return Response({
            #     'token': token.key,
            #     'user_id': user.pk,
            #     'email': user.email
            # })
            return Response(create_message(message="Successfullly", data=[{
                'token': token.key,
                'user_id': user.pk,
                'email': user.email
            }]), status=status.HTTP_200_OK)

        except Exception as e:
            return Response(create_message(error=True, message=e, data=[]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['post'], detail=True)
    def ForgetPasswordView(self, request):
        try:
            entity = User.objects.filter(email=request.data.get('email', ''))
            if entity:
                user = entity[0]
                print('zone')
                password = secrets_obj.get_random_keys('password')
                print('zone2', password)
                user.set_password(password)
                print('zone3')
                # partner = Partner.object.get(id=user.partner_id)
                print('zone4')
                # partner_name = partner.name
                user.save()
                subject = 'welcome to GFG world'
                message = f'Hi {user.email}, your new password. {password}'
                email_from = settings.EMAIL_HOST_USER
                recipient_list = [user.email, ]
                send_mail(
                    subject, message, email_from, recipient_list)
                return Response(create_message(message="successfully Send"), status=status.HTTP_200_OK)

            return Response(create_message(message="User Does Not Exists"), status=status.HTTP_200_OK)
            # return Response({'message': 'User Does Not Exists'})

        except Exception as e:
            # exc_type, exc_obj, exc_tb = sys.exc_info()
            # fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            # print(exc_type, fname, exc_tb.tb_lineno)
            print(e)
            return Response(create_message(error=True, error_messages=e, data=[]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            # return Response({'message': 'exception_message'})
