# Generated by Django 2.1.4 on 2018-12-13 06:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_auto_20181213_1452'),
    ]

    operations = [
        migrations.AddField(
            model_name='store',
            name='img',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]
