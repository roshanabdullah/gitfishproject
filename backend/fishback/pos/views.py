from email import message
from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from django.shortcuts import redirect
from django.contrib.auth.models import auth, User
from django.contrib.auth import authenticate
from django.contrib import messages
from app.models import *
from django. db. models import Q
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.template import loader
from django.http import JsonResponse
from rest_framework.generics import ListAPIView,RetrieveAPIView, CreateAPIView, UpdateAPIView
from .serializer import branchSerializer
# Create your views here.


def index(request):
    if request.method=='POST':
        username=request.POST['loginUser']
        password=request.POST['loginPassword']
      
        user=auth.authenticate(username=username, password=password)  
        
        if user is not None:
            auth.login(request, user)
            return redirect('dashboard')
        else:
            messages.info(request, 'Credentials Invalid')
            return redirect('index')
    else:
    
        return render(request, 'index.html')   
    
           
        
    
def dashboard(request):
    data=customerData.objects.all()
    print(data)
    if request.method=='POST':
        post=customerData()
        post.fname=request.POST.get('customer_fname')
        post.lname=request.POST.get('customer_lname')
        post.gender=request.POST.get('customer_gender')
        post.address=request.POST.get('customer_address')
        post.city=request.POST.get('customer_city')
        post.zip=request.POST.get('customer_zip')
        post.state=request.POST.get('customer_state')
        post.mobile_phone=request.POST.get('customer_home_phone')
        post.home_phone=request.POST.get('customer_work_phone')
        post.customer_email=request.POST.get('customer_email')
        post.dateofpurchase=request.POST.get('customer_purchase')
        post.deliverydate=request.POST.get('customer_delivery')
        post.save()
        return render(request, 'dashboard.html' , {"messages":data})
    else:
        return render(request, 'dashboard.html', {"messages":data})
    
    
def delete(request, id):
    member=customerData.objects.get(customer_id=id);
    member.delete();
    return HttpResponseRedirect(reverse('dashboard'))   

def update(request, id):
    my_update=customerData.objects.get(customer_id=id)
    template = loader.get_template('update.html')
    context = {
    'my_update': my_update,
  }
    return HttpResponse(template.render(context, request))
          
  
def updaterecord(request, id):
    first=request.POST['update_fname']
    l_second=request.POST['update_lname']
    gender=request.POST['update_gender'] 
    update=customerData.objects.get(customer_id=id)
    update.fname=first
    update.lname=l_second
    update.gender=gender
    update.save()
    return HttpResponseRedirect(reverse('dashboard'))


    
class DataListView(ListAPIView):
    queryset=branches.objects.all()
    serializer_class=branchSerializer
    
class DataDetailView(RetrieveAPIView):
    queryset=branches.objects.all()
    serializer_class=branchSerializer
    
class DataCreateView(CreateAPIView):
    queryset=branches.objects.all()
    serializer_class=branchSerializer

class DataUpdateView(UpdateAPIView):
    queryset=branches.objects.all()
    serializer_class=branchSerializer
    