from django.db import models
from users.models import User
import pytz
TIMEZONES = tuple(zip(pytz.all_timezones, pytz.all_timezones))
# Create your models here.


class Base(models.Model):
    created_datetime = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(null=True, blank=True, default=True)

    class Meta:
        abstract = True


class Franchise(Base):
    user = models.ForeignKey(User, null=True, blank=True, related_name='franchise_user_id_fk',
                             on_delete=models.CASCADE)
    franchise_name = models.CharField(max_length=250, null=True, blank=True)
    franchise_address = models.CharField(max_length=300, null=True, blank=True)
    franchise_contact_number = models.CharField(
        max_length=45, null=True, blank=True)
    franchise_latitude = models.FloatField(null=True, blank=True)
    franchise_longitude = models.FloatField(null=True, blank=True)
    franchise_key = models.CharField(max_length=24, null=True, blank=True)
    franchise_timezone = models.CharField(
        max_length=32, choices=TIMEZONES, default='UTC')
    franchise_radius = models.FloatField(null=True, blank=True)
    franchise_order_limit = models.PositiveSmallIntegerField(
        default=30, null=True, blank=True)

    def __str__(self):
        return self.franchise_name
