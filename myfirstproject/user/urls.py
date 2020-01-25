from django.conf.urls import url, include
from django.contrib.auth import views as auth_views
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import reverse
from user.views import DisableUser, CreateUser, ProfileView, ProfileEditView, PublicProfile

app_name = 'user'
urlpatterns = [
    url(r'^login/$', auth_views.LoginView.as_view(), name='login'),
    url(r'^logout/$', auth_views.LogoutView.as_view(extra_context={'form': AuthenticationForm}), name='logout'),
    url(r'^password/change/', auth_views.PasswordChangeView.as_view(), name='password_change'),
    url(r'^password/reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    url(r'^disable/$', DisableUser.as_view(), name='disable_user'),
    url(r'^register/$', CreateUser.as_view(), name='register'),
    url(r'^profile/$', ProfileView.as_view(), name='profile'),
    url(r'^profile/edit/$', ProfileEditView.as_view(), name='profile_edit'),
    url(r'^(?P<slug>[\w-]+)/', PublicProfile.as_view(), name='public_profile'),
]
