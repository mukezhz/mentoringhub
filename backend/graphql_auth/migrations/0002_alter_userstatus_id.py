# Generated by Django 3.2 on 2022-10-04 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('graphql_auth', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userstatus',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
