# Generated by Django 3.2 on 2022-09-22 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_userprofile_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='languages',
            field=models.JSONField(null=True, verbose_name='languages'),
        ),
    ]
