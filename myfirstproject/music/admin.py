from django.contrib import admin
from .models import *
from django.contrib.auth.models import Permission
from user.models import Profile

admin.site.register(Artist)
admin.site.register(Album)
admin.site.register(Comment)
admin.site.register(Permission)
admin.site.register(Profile)


class SongAdmin(admin.ModelAdmin):
    list_display = ('song_title', 'artists', )
    list_filter = ('album',)

    def artists(self, obj):
        return obj.artist_name.count()
    artists.short_description = 'Number of Artists'


admin.site.register(Song, SongAdmin)



