from django.urls import path
from . import views
from .views import *


urlpatterns=[
    path('', views.index, name="index"),
    path('dashboard', views.dashboard, name="dashboard"),
    path('delete/<int:id>', views.delete, name='delete'),
    path('update/<int:id>', views.update, name='update'),
    path('update/updaterecord/<int:id>', views.updaterecord, name='updaterecord'),
    path('branch/', DataListView.as_view()),
    path('branch/<pk>', DataDetailView.as_view()),
    path('branchcreate/', DataCreateView.as_view()),
    path('<pk>/updatebranch/', DataUpdateView.as_view())
]
