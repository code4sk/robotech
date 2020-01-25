from django import forms
from django.core.mail import BadHeaderError, mail_managers, send_mail
from myfirstproject import settings


class ContactForm(forms.Form):
    email = forms.EmailField(initial='kapoorshubham098@gmail.com')
    text = forms.CharField(max_length=500, widget=forms.Textarea(attrs={'placeholder': 'Enter Your Feedback Here'}))
    dict = (('F', 'Feedback'), ('C', 'Complaint'))
    reason = forms.ChoiceField(choices=dict, initial='F')

    def send_mail(self):
        reason = self.cleaned_data.get('reason')
        email = self.cleaned_data.get('email')
        text = self.cleaned_data.get('text')
        reason_dict = dict(self.dict)
        full_reason = reason_dict.get(reason)
        body = 'message from {}\n\n{}'.format(email, text)
        send_mail(subject=full_reason, from_email=settings.EMAIL_HOST_USER,
                  recipient_list=['kapoorshubham098@gmail.com'], message=body,
                  fail_silently=False)
        return True
