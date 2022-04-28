from django.db import models
# Create your models here.
class CreateAcc(models.Model):
    id=models.AutoField(primary_key=True)
    username=models.CharField(max_length=100) 
    email=models.CharField(max_length=100)
    password=models.CharField(max_length=100)
    

    def __str__(self):
        return f"{self.id},{self.username},{self.email}"
    
    class Meta:
        ordering=("id","username","email","password")
        verbose_name_plural = "User Accounts"
        

    
    
   