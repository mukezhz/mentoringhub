# Generated by Django 3.2 on 2022-09-21 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mentorships', '0002_auto_20220921_1405'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mentorship',
            name='qna',
            field=models.JSONField(null=True),
        ),
        migrations.AlterField(
            model_name='mentorship',
            name='title',
            field=models.CharField(max_length=50, null=True),
        ),
    ]