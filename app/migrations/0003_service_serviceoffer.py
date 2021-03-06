# Generated by Django 2.1 on 2018-10-29 18:45

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0002_auto_20181023_1400'),
    ]

    operations = [
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=64)),
                ('price', models.FloatField(default=0)),
                ('zipcode', models.IntegerField(default=0)),
                ('description', models.TextField(default='')),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('rating', models.FloatField(default=5, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Category')),
                ('consumer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ServiceConsumer', to=settings.AUTH_USER_MODEL)),
                ('provider', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ServiceProvider', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ServiceOffer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=64)),
                ('maxPrice', models.FloatField(default=0)),
                ('minPrice', models.FloatField(default=0)),
                ('zipcode', models.IntegerField(default=0)),
                ('description', models.TextField(default='')),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Category')),
                ('provider', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
