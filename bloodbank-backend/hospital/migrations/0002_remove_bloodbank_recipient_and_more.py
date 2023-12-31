# Generated by Django 4.2.2 on 2023-06-07 16:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_user_blood_group'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('hospital', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bloodbank',
            name='recipient',
        ),
        migrations.AlterField(
            model_name='bloodbank',
            name='blood_group',
            field=models.CharField(choices=[('O+', 'O+'), ('A+', 'A+'), ('B+', 'B+'), ('AB+', 'AB+'), ('O-', 'O-'), ('A-', 'A-'), ('B-', 'B-'), ('AB-', 'AB-')], max_length=5),
        ),
        migrations.AlterField(
            model_name='hospital',
            name='hospital_type',
            field=models.CharField(choices=[('GOVERNMENT', 'Government'), ('PRIVATE', 'Private')], max_length=20),
        ),
        migrations.CreateModel(
            name='Recipient',
            fields=[
                ('basemodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='users.basemodel')),
                ('blood_bank', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hospital.bloodbank')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            bases=('users.basemodel',),
        ),
    ]
