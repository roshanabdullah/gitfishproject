from django.urls import path, include
from rest_framework import routers
from .views import *


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('address', AddressViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('login/', UserViewSet.as_view({'post': 'login'})),
    path('forget_password/',
         UserViewSet.as_view({"post": "ForgetPasswordView"})),

]
