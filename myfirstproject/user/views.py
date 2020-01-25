from django.template.response import TemplateResponse
from django.shortcuts import redirect
from django.views.generic import View
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.views import LogoutView
from django.contrib.auth import logout, get_user, login
from django.http import HttpResponse
from .forms import UserForm, ProfileForm, UserEditForm
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from user.models import *
from django.template.defaultfilters import slugify


class DisableUser(View):
    template_name = 'user/disable.html'

    # @method_decorator(csrf_protect)
    @method_decorator(login_required(login_url="/user/login/"))
    def get(self, request):
        return TemplateResponse(request, self.template_name)

    # @method_decorator(csrf_protect)
    @method_decorator(login_required(login_url="/user/login/"))
    def post(self, request):
        user = get_user(request)
        user.is_active = False
        user.save()
        logout(request)
        return redirect(reverse('home'))


class CreateUser(View):
    def get(self, request):
        form = UserForm()
        return render(request, 'user/create.html', {'form': form})

    def post(self, request):
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            username = request.POST.get('username')
            user = User.objects.get(username=username)
            profile = Profile.objects.create(slug=slugify(username), user=user)
            profile.save()
            login(request, user)
            return redirect(reverse(request.POST.get('next')))
        return render(request, 'user/create.html', {'form': form})


class ProfileView(View):
    @method_decorator(login_required(login_url="/user/login/"))
    def get(self, request):
        return render(request, 'user/profile.html')


class ProfileEditView(View):
    @method_decorator(login_required(login_url="/user/login/"))
    def get(self, request):
        form = UserEditForm(instance=request.user)
        prof = Profile.objects.get(user=request.user)
        profile = ProfileForm(initial={'about': prof.about})
        return render(request, 'user/profile_edit.html', {'profile': profile, 'form': form})

    @method_decorator(login_required(login_url="/user/login/"))
    def post(self, request):
        form = UserEditForm(request.POST, instance=request.user)
        profile = ProfileForm(request.POST, instance=request.user.profile)
        if form.is_valid:
            form.save()
        else:
            return render(request, 'user/profile_edit.html', {'profile': profile, 'form': form})
        if profile.is_valid:
            profile.save()
            return redirect(reverse('user:profile'))
        else:
            return render(request, 'user/profile_edit.html', {'profile': profile, 'form': form})


class PublicProfile(View):
    @method_decorator(login_required(login_url="/user/login/"))
    def get(self, request, slug):
        user = get_object_or_404(User, username=slug)
        return render(request, 'user/public_profile.html', {'user': user})
