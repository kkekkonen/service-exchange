# Generated by Django 2.1 on 2018-11-13 09:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_service_serviceoffer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='serviceOffer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Service', to='app.ServiceOffer'),
        ),
    ]
