# Generated by Django 2.1.5 on 2019-03-03 16:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0004_artist_slug'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Songs',
            new_name='Song',
        ),
    ]