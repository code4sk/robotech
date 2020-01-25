from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from user.views import SignUp

app_name = 'user'
urlpatterns = [
    path('login/', LoginView.as_view(), name="login"),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('sign-up/', SignUp.as_view(), name='sign-up'),
]