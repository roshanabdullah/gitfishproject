# from datetime import datetime
# from django.db import models

# # from apps.promotions.utils import *
# from users.models import User
# from franchise.models import Franchise
# from catalog.models import Item


# class Base(models.Model):
#     # partner = models.ForeignKey(Partner, related_name="%(app_label)s_%(class)s_partner_id_fk", null=True, blank=True,
#     #                             on_delete=models.CASCADE)
#     branch = models.ForeignKey(Franchise, related_name="%(app_label)s_%(class)s_branch_id_fk", null=True, blank=True,
#                                on_delete=models.CASCADE)
#     created_by = models.ForeignKey(
#         User, null=True, blank=True, related_name="%(app_label)s_%(class)s_created_by", on_delete=models.CASCADE)
#     created_datetime = models.DateTimeField(auto_now_add=True)
#     # modified_by = models.ForeignKey(AUTH_USER_MODEL, blank=True, related_name="%(app_label)s_%(class)s_modified_by", null=True, on_delete=models.CASCADE)
#     # modified_datetime = models.DateTimeField(blank=True, null=True)
#     # status = models.PositiveSmallIntegerField(null=True, blank=True)
#     # os = models.CharField(max_length=10, null=True, blank=True)

#     class Meta:
#         abstract = True


# class Promotions(Base):
#     name = models.CharField(max_length=250, null=True, blank=True, default="")
#     description = models.TextField(null=True, blank=True)
#     # type = models.IntegerField(choices=DEAL_TYPES, default=DEAL_TYPE_PROMOTIONS, null=False, blank=False)
#     duration = models.PositiveSmallIntegerField(null=False, blank=False)
#     date_start = models.DateTimeField(null=True, blank=True)
#     date_end = models.DateTimeField(null=True, blank=True)
#     is_recurrence = models.BooleanField(default=False)
#     price = models.FloatField(default=0, null=True, blank=True)
#     image = models.ImageField(
#         upload_to='image/', default='image/default.jpg', null=True, blank=True)

#     # class Meta:
#     #     db_table = 'promotion'
#     #     verbose_name_plural = 'promotions'


# class DealCategory(Base):
#     deal = models.ForeignKey(
#         Item, on_delete=models.CASCADE, null=True, blank=True)
#     name = models.CharField(max_length=100, null=True, blank=True)
#     is_category = models.BooleanField(default=False)

#     class Meta:
#         db_table = 'deal_category'
#         verbose_name_plural = 'deal_categories'


# class DealItems(Base):
#     item = models.ForeignKey(Item, related_name="item_deal_fk",
#                              on_delete=models.CASCADE, null=True, blank=True)
#     dealcategory = models.ForeignKey(
#         DealCategory, related_name='deal_category_fk', on_delete=models.CASCADE, null=True, blank=True)

#     class Meta:
#         db_table = 'deal_item'
#         verbose_name_plural = 'deal_items'
