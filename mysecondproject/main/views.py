from django.views import View
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from main.models import Cart


class Home(View):
    def get(self, request):
        return render(request, 'main/home.html', {})


class ContactUs(View):
    def get(self, request):
        return render(request, 'main/contact.html',{})


class AboutUs(View):
    def get(self, request):
        return render(request, 'main/about.html', {})


class Faq(View):
    def get(self, request):
        return render(request, 'main/faq.html', {})


class CartView(View):
    def get(self, request):
        user = request.user
        a = Cart.objects.get(user=user)
        num = a.one + a.two +a.three
        price = num*350
        return render(request, 'main/cart.html', {'num': num, 'price': price})
