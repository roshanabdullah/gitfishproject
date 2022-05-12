from django.urls import path, include
from rest_framework import routers
from .views import *


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register('', CartViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("checkout", CartViewSet.as_view({'get': "checkout"}))

]
