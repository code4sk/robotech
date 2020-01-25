from django.db import models


class GameDeveloper(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()


class Games(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField()
    description = models.TextField()
    game_developer = models.ForeignKey(GameDeveloper, on_delete=models.CASCADE)
