# Generated by Django 4.2.2 on 2023-06-07 16:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('users', '0002_alter_user_blood_group'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hospital',
            fields=[
                ('basemodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='users.basemodel')),
                ('name', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('hospital_type', models.CharField(choices=[], max_length=20)),
                ('phone_number1', models.CharField(max_length=20, unique=True)),
                ('phone_number2', models.CharField(blank=True, max_length=20, null=True, unique=True)),
                ('website', models.URLField(blank=True, null=True)),
                ('email', models.EmailField(max_length=255, unique=True)),
            ],
            bases=('users.basemodel',),
        ),
        migrations.CreateModel(
            name='BloodBank',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bag_quentity', models.IntegerField(default=1)),
                ('blood_group', models.CharField(choices=[], max_length=5)),
                ('is_available', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('donor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blood_donor', to=settings.AUTH_USER_MODEL)),
                ('hospital', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='blood_bank', to='hospital.hospital')),
                ('recipient', models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]