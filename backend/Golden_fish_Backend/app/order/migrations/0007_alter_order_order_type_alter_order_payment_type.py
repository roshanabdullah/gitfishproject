# Generated by Django 4.0.4 on 2022-05-10 23:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0006_alter_order_order_type_alter_order_payment_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_type',
            field=models.PositiveSmallIntegerField(blank=True, choices=[(1, 'takeaway'), (2, 'dine'), (3, 'delivery')], default=1, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='payment_type',
            field=models.PositiveSmallIntegerField(blank=True, choices=[(1, 'cash'), (2, 'Credit Card'), (3, 'Debit Card')], default=1, null=True),
        ),
    ]
