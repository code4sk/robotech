# Generated by Django 2.1.5 on 2019-03-03 17:23

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('music', '0008_auto_20190303_2225'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Song',
            new_name='Songs',
        ),
    ]