from django.shortcuts import render
from django.views import View
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from main.models import Cart
from django.shortcuts import redirect, reverse
from django.contrib.auth import login
from forms import SignUpForm
from django.core.exceptions import ValidationError


class SignUp(View):
    def get(self, request):
        form = SignUpForm()
        return render(request, 'user/sign-up.html', {'form': form})

    def post(self, request):
        form = SignUpForm(request.POST)
        if not form.is_valid():
            err = form.errors
            return render(request, 'user/sign-up.html', {'form': form, 'err': err})
        else:
            new = User.objects.create_user(username=request.POST.get('username'), password=request.POST.get('password'),
                                    email=request.POST.get('email'))
            new.save()
            login(request, new)
            new1 = Cart.objects.create(user=request.user,one=0,two=0,three=0)
            return redirect(reverse('home'))
