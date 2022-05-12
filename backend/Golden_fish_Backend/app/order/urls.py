from django.urls import path, include
from rest_framework import routers
from .views import *


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register('order', OrderViewSet)
router.register('order_details', OrderDetailsViewSet)
router.register('order_logs', OrderLogsViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('place_order/', OrderLogsViewSet.as_view({"post": "place_order"}))

]
