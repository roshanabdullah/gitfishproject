from django.db import models

from catalog.models import Item
from users.models import User
from franchise.models import Franchise


class Base(models.Model):
    # partner = models.ForeignKey(Partner, related_name="%(app_label)s_%(class)s_partner_id_fk", null=True, blank=True,
    #                             on_delete=models.CASCADE)
    branch = models.ForeignKey(Franchise, related_name="%(app_label)s_%(class)s_branch_id_fk", null=True, blank=True,
                               on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, null=True, blank=True,
                                   related_name="%(app_label)s_%(class)s_created_by", on_delete=models.CASCADE)
    created_datetime = models.DateTimeField(auto_now_add=True)
    # modified_by = models.ForeignKey(AUTH_USER_MODEL, blank=True, related_name="%(app_label)s_%(class)s_modified_by",
    #                                 null=True, on_delete=models.CASCADE)
    # modified_datetime = models.DateTimeField(blank=True, null=True)
    # status = models.PositiveSmallIntegerField(null=True, blank=True)
    # os = models.CharField(max_length=10, null=True, blank=True)

    class Meta:
        abstract = True

# Todo: is_waiter key is 1 for pos app and 0 for user app


class Order(Base):

    CASH = 1
    CREDIT_CARD = 2
    DEBIT_CARD = 3

    TAKEAWAY = 1
    DINE = 2
    DELIVERY = 3

    PAYMENT_TYPE = (
        (CASH, "cash"),
        (CREDIT_CARD, "Credit Card"),
        (DEBIT_CARD, "Debit Card"),
    )

    ORDOR_TYPE = (
        (TAKEAWAY, "takeaway"),
        (DINE, "dine"),
        (DELIVERY, "delivery"),
    )
    user = models.ForeignKey(
        User, related_name="order_user_fk",
        on_delete=models.CASCADE, null=True, blank=True,
    )
    internal_id = models.CharField(max_length=20, null=True, blank=True)
    payment_type = models.PositiveSmallIntegerField(
        choices=PAYMENT_TYPE, default=CASH, null=True, blank=True)

    order_type = models.PositiveSmallIntegerField(
        choices=ORDOR_TYPE, default=TAKEAWAY, null=True, blank=True)

    order_datetime = models.DateTimeField(null=True, blank=True)
    # order_value = models.FloatField(default=0, null=True, blank=True)
    # tip = models.FloatField(default=0, null=True, blank=True)
    total = models.FloatField(default=0, null=True, blank=True)
    paid = models.FloatField(default=0, null=True, blank=True)
    # type = models.PositiveSmallIntegerField(default=1, null=True,blank=True)
    amount_received = models.FloatField(default=0, null=True, blank=True)
    amount_returned = models.FloatField(default=0, null=True, blank=True)
    # split_amount = models.FloatField(default=0, null=True, blank=True)
    # split_no_persons = models.PositiveSmallIntegerField(default=0, null=True, blank=True)
    order_status = models.BooleanField(default=True, null=True, blank=True)
    # internal_modified_datetime = models.DateTimeField(null=True, blank=True)
    rating = models.PositiveSmallIntegerField(null=True, blank=True)
    rating_comments = models.CharField(null=True, blank=True, max_length=300)

    class Meta:
        db_table = 'order'
        verbose_name_plural = 'orders'

    def __str__(self):
        return "order :" + str(self.internal_id)


class OrderLogs(Base):
    order = models.ForeignKey(
        Order, related_name="order_logs_order_fk", on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(
        Item, related_name="order_logs_item_fk", on_delete=models.CASCADE, null=True, blank=True)
    item_price = models.FloatField(default=0, null=True, blank=True)
    internal_id = models.CharField(max_length=20, null=True, blank=True)
    # order_attributes = JSONField()
    notes = models.TextField(null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True)
    # prepared_at = models.DateTimeField(null=True, blank=True)
    # order_log_status = models.PositiveSmallIntegerField(default=1, null=True, blank=True)

    class Meta:
        db_table = 'order_logs'
        verbose_name_plural = 'orders_logs'

    def __str__(self):
        return "order log :" + str(self.internal_id)


class OrderDetails(Base):
    order = models.OneToOneField(
        Order, related_name="order_fk", on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=250, null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    pickup_time = models.DateTimeField(blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    class Meta:
        db_table = 'order_details'
        verbose_name_plural = 'orders_details'


class Transections(Base):
    order = models.ForeignKey(Order, related_name="transection_order_fk",
                              on_delete=models.CASCADE, null=True, blank=True)
    transection_id = models.CharField(max_length=250, null=True, blank=True)

    class Meta:
        db_table = 'transections'
        verbose_name_plural = 'transections'
