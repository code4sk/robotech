from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from user.models import Profile


class UserForm(UserCreationForm):
    username = forms.CharField(max_length=100, required=True)
    first_name = forms.CharField(max_length=25)
    last_name = forms.CharField(max_length=25)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name',)

    def clean_username(self):
        username = self.cleaned_data['username']
        not_allowed = ('login', 'register', 'disable', 'logout')
        if username in not_allowed:
            raise ValidationError('This username is not allowed')
        return username


class ProfileForm(forms.ModelForm):
    about = forms.Textarea()

    class Meta:
        model = Profile
        fields = ['about']


class UserEditForm(UserChangeForm):

    class Meta:
        model = User
        fields = ('first_name', 'last_name','password',)
