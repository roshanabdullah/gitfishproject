from django.urls import path, include
from rest_framework import routers
from .views import *




urlpatterns = [
  path('listcreate/', accViewList.as_view()),
  path('<pk>/', accViewDetail.as_view())
]