
from .models import *
from .serializer import *
from rest_framework import generics





class accViewList(generics.ListCreateAPIView):
    queryset = CreateAcc.objects.all()
    serializer_class = accSerializer
    

class accViewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CreateAcc.objects.all()
    serializer_class = accSerializer
   


    