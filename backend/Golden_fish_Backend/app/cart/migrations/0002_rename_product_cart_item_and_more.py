# Generated by Django 4.0.4 on 2022-04-30 14:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cart',
            old_name='product',
            new_name='item',
        ),
        migrations.RenameField(
            model_name='cart',
            old_name='product_price',
            new_name='item_price',
        ),
    ]
