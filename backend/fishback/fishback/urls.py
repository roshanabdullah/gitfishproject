from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework.authtoken.views import obtain_auth_token
from pos.views import *


urlpatterns = [
    path('', include('pos.urls')),
    path('admin/', admin.site.urls),
    path('app/', include('app.urls')),
    path('auth/', obtain_auth_token),
    
    
    
]
