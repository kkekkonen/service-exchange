# Generated by Django 2.1 on 2018-11-13 09:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_remove_service_serviceoffer'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='serviceOffer',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
