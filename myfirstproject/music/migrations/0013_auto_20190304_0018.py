# Generated by Django 2.1.5 on 2019-03-03 18:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0012_auto_20190303_2305'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='song',
            name='album',
        ),
        migrations.RemoveField(
            model_name='song',
            name='artist',
        ),
        migrations.DeleteModel(
            name='Song',
        ),
    ]
