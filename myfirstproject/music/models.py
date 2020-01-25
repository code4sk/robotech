from django.db import models
from django.contrib.auth.models import User


class Artist(models.Model):
    name = models.CharField(max_length=50)
    image = models.CharField(max_length=100, default="")
    slug = models.CharField(max_length=100, default="NULL")

    def __str__(self):
        return self.name


class Album(models.Model):
    album_title = models.CharField(max_length=50)
    slug = models.CharField(max_length=100, default="")
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    image = models.CharField(max_length=100, default="")

    def __str__(self):
        return self.album_title


class Song(models.Model):
    song_title = models.CharField(max_length=50)
    slug = models.CharField(max_length=100, default="")
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    artist_name = models.ManyToManyField(Artist, related_name='song')

    def __str__(self):
        return self.song_title


class Comment(models.Model):
    comment = models.CharField(max_length=500)
    song = models.ForeignKey(Song, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.comment
