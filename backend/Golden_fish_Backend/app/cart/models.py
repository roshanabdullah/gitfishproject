from django.db import models

from catalog.models import Item
from franchise.models import Franchise
from users.models import User
# from apps.promotions.models import Promotions


class Base(models.Model):

    branch = models.ForeignKey(Franchise, related_name="%(app_label)s_%(class)s_branch_id_fk", null=True, blank=True,
                               on_delete=models.CASCADE)

    created_datetime = models.DateTimeField(auto_now_add=True)

    status = models.BooleanField(null=True, blank=True, default=True)

    class Meta:
        abstract = True


class Cart(Base):
    internal_id = models.CharField(max_length=20, null=True, blank=True)
    user = models.ForeignKey(User, related_name="cart_user_fk",
                             on_delete=models.CASCADE, null=True, blank=True)
    total = models.FloatField(default=0, null=True, blank=True)
    internal_modified_datetime = models.DateTimeField(null=True, blank=True)
    item = models.ForeignKey(
        Item, related_name="cart_item_fk", on_delete=models.CASCADE, null=True, blank=True)
    item_price = models.FloatField(default=0, null=True, blank=True)
    # cart_attributes = JSONField()
    notes = models.TextField(null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True)
    active = models.BooleanField(default=True)
    # deal = models.ForeignKey(Promotions, related_name="cart_deal_fk",
    #                          on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = 'cart'
        verbose_name_plural = 'carts'


# class CartLogs(Base):
#     cart = models.ForeignKey(
#         Cart, related_name="cart_logs_cart_fk", on_delete=models.CASCADE, null=True, blank=True)
#
#     # prepared_at = models.DateTimeField(null=True, blank=True)
#     # order_log_status = models.PositiveSmallIntegerField(default=1, null=True, blank=True)
#
#     class Meta:
#         db_table = 'cart_logs'
#         verbose_name_plural = 'cart_logs'
