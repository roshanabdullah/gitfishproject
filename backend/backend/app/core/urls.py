"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from rest_framework_swagger.views import get_swagger_view
from rest_framework.documentation import include_docs_urls
from django.urls import path, include
from django.contrib import admin

from rest_framework.schemas import get_schema_view

schema_view = get_schema_view(title='Fish backend API')

schema_view = get_swagger_view(title='Fish backend API')

urlpatterns = [
    path(r'', include_docs_urls(title='Fish backend')),
    path(r'swagger-docs/', schema_view),
    path('admin/', admin.site.urls),
    path('', include('users.urls')),
    path('schema/', schema_view),

]
