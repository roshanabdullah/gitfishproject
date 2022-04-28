from django.db import models
from django.utils import timezone
from datetime import datetime
# Create your models here.
class adminLogin(models.Model):
    id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=100) 
    email=models.EmailField(max_length=50)
    password=models.CharField(max_length=100)
    

    def __str__(self):
        return f"{self.id},{self.name},{self.email},{self.password}"
    
    class Meta:
        ordering=("id","name","email","password")
        verbose_name_plural = "AdminCredentials"
        

class customerData(models.Model):
    customer_id=models.AutoField(primary_key=True)
    fname=models.CharField(max_length=100)
    lname=models.CharField(max_length=100)
    gender=models.CharField(max_length=15)
    address=models.CharField(max_length=200)
    city=models.CharField(max_length=100)
    zip=models.CharField(max_length=50)
    state=models.CharField(max_length=100)
    mobile_phone=models.CharField(max_length=50)
    home_phone=models.CharField(max_length=50)
    customer_email=models.EmailField(max_length=50)
    dateofpurchase=models.DateField(auto_now_add=True)
    deliverydate=models.DateField(auto_now_add=True)
   
    
    
    
    def __str__(self):
        return f"{self.customer_id},{self.fname},{self.lname},{self.customer_email}" 
    
    class Meta:
        ordering=("customer_id","fname","lname","customer_email")
        verbose_name_plural = "CustomerData"

class branches(models.Model):
    branch_id=models.AutoField(primary_key=True)
    branch_name=models.CharField(max_length=100)
    branch_address=models.CharField(max_length=100)
    branch_code=models.CharField(max_length=12)
    
    def __str__(self):
        return f"{self.branch_id},{self.branch_name},{self.branch_address},{self.branch_code}"
    class Meta:
        ordering=("branch_id","branch_name","branch_address","branch_code")
        verbose_name_plural = "Branches"
    