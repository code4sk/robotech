# Generated by Django 2.1.5 on 2019-03-04 08:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0017_delete_song'),
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('song_title', models.CharField(max_length=50)),
            ],
        ),
    ]
