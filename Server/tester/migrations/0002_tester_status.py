# Generated by Django 2.1.4 on 2018-12-12 03:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tester', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tester',
            name='status',
            field=models.BooleanField(default=True),
        ),
    ]