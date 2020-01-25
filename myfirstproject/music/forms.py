from django import forms
from music.models import Comment
from django.core.exceptions import ValidationError


class CommentForm(forms.ModelForm):             # or forms.Form
    comment = forms.CharField(max_length=500, widget=forms.TextInput(attrs={'size': 100}))

    class Meta:
        model = Comment
        fields = ['comment']
        # or ['comment',]  or exclude = tuple()
        # fields = '__all__'

    def clean_comment(self):
        comm = self.cleaned_data.get('comment')
        count = comm.count('fuck')
        if count >= 2:
            raise ValidationError('Kindly be niceee in comments')
        else:
            if 'fuck' in comm.lower():
                comm = comm.replace('fuck', 'f**k')
            return comm








































"""" def save(self):
        comm = Comment.objects.create(comment=self.cleaned_data['comment'])
        return comm"""