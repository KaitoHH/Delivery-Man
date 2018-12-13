# Generated by Django 2.1.4 on 2018-12-13 06:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_auto_20181213_1443'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='latitude',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AlterField(
            model_name='store',
            name='longitude',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AlterField(
            model_name='store',
            name='serviceTime',
            field=models.CharField(blank=True, default='08:00:00 - 18:00:00', max_length=50),
        ),
        migrations.AlterField(
            model_name='store',
            name='star',
            field=models.IntegerField(blank=True, default=5),
        ),
    ]