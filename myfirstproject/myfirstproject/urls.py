"""myfirstproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include, re_path
from myfirstproject.views import Home, AlbumDetail, SongDetail, CommentUpdate, CommentDelete, Contact
from myfirstproject.views import Detail
from music import urls as music_url
from user import urls as user_urls
from django.contrib.auth.decorators import login_required
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib.auth import views as auth_views
# admin.site.site_header = 'myfirstproject'
admin.site.site_title = 'code4google'
urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^user/password/reset/complete/$', auth_views.PasswordResetCompleteView.as_view()
        , name='password_reset_complete'),
    url(r'^user/password/change/done/$', auth_views.PasswordChangeDoneView.as_view()
        , name='password_change_done'),
    url(r'^user/password/reset/confirm/'+r'(?P<uidb64>[0-9A-Za-z_\-]+)/'
        + r'(?P<token>[0-9A-Za-z]{1,13}'+r'-[0-9A-Za-z]{1,20})/$', auth_views.PasswordResetConfirmView.as_view()
        , name='password_reset_confirm'),
    url(r'^user/password/reset/done/$', auth_views.PasswordResetDoneView.as_view()
        , name='password_reset_done'),
    url(r'^user/', include(user_urls), name='login'),
    url(r'^about', include('django.contrib.flatpages.urls'), name="flat"),
    url(r'^(?P<val1>[\w-]+)/' + r'(?P<val2>[\w-]+)/' + r'(?P<val3>[\w-]+)/delete/' + r'(?P<val4>[\w-]+)/',
        CommentDelete.as_view(), name="link6"),
    url(r'^(?P<val1>[\w-]+)/' + r'(?P<val2>[\w-]+)/' + r'(?P<val3>[\w-]+)/create/' + r'(?P<val4>[\w-]+)/',
        CommentUpdate.as_view(), name="link5"),
    url(r'^$', Home.as_view(), name='home'),
    url(r'^(?P<link>[\w-]+)/$', Detail.as_view(), name="link"),
    url(r'^(?P<val1>[\w-]+)/'+r'(?P<val2>[\w-]+)/$', AlbumDetail.as_view(), name="link2"),
    url(r'^(?P<val1>[\w-]+)/' + r'(?P<val2>[\w-]+)/' + r'(?P<val3>[\w-]+)/', SongDetail.as_view(), name="link3"),
    url(r'^contact$', Contact.as_view(), name='contact'),
]
urlpatterns += staticfiles_urlpatterns()
