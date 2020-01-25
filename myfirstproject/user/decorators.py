from django.contrib.auth import get_user
from django.shortcuts import redirect


def custom_login_decorator(view):

    def new_view(request, *args, **kwargs):
        user = get_user(request)
        if user.is_authenticated:
            return view(request, *args, **kwargs)
        else:
            url_path = "/user/login/?next={}".format(request.path)
            return redirect(url_path)

    return new_view
