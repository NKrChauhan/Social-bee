# Generated by Django 3.2.2 on 2021-05-21 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(blank=True, choices=[('O', 'Other'), ('F', 'Female'), ('M', 'Male')], max_length=1, null=True),
        ),
    ]
