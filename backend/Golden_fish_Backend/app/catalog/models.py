from django.db import models
from franchise.models import Franchise
from users.models import User


# Create your models here.
class Base(models.Model):

    branch = models.ForeignKey(Franchise, related_name="%(app_label)s_%(class)s_branch_id_fk", null=True, blank=True,
                               on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, null=True, blank=True,
                                   related_name="%(app_label)s_%(class)s_created_by",
                                   on_delete=models.CASCADE)
    created_datetime = models.DateTimeField(auto_now_add=True)

    modified_datetime = models.DateTimeField(blank=True, null=True)
    status = models.BooleanField(null=True, blank=True, default=True)

    class Meta:
        abstract = True


class ParentCategory(Base):
    name = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'parent_category'
        verbose_name_plural = 'parent_categories'

    def __str__(self):
        return self.name


class Category(Base):
    parent_category = models.ForeignKey(ParentCategory, related_name="parent_category_id_fk", null=True, blank=True,
                                        on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(
        upload_to='image/', default='image/default.jpg', null=True, blank=True)
    cover_image = models.ImageField(
        upload_to='image/', default='image/default.jpg', null=True, blank=True)
    ordering = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


class Item(Base):
    category = models.ForeignKey(
        Category, related_name="item_category_id_fk",
        null=True, blank=True, on_delete=models.CASCADE
    )

    name = models.CharField(max_length=100)
    price = models.FloatField(default=0, null=True, blank=True)

    detail = models.TextField(null=False, blank=True, default="")
    image = models.ImageField(
        upload_to='image/', default='image/default.jpg', null=True, blank=True)

    isavailable = models.BooleanField(null=True, blank=True, default=True)

    class Meta:
        db_table = 'items'
        verbose_name_plural = 'items'

    def __str__(self):
        return self.name
