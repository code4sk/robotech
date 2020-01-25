from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.template.response import TemplateResponse
from music.models import *
from django.template import loader, Context
from django.shortcuts import get_object_or_404, render_to_response, render, redirect
from django.views.generic import View
from music.forms import CommentForm
from django.urls import reverse
from contact.forms import ContactForm
from django.contrib.messages import success
from django.core.mail import send_mail
from myfirstproject import settings
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.views.generic import ListView, DetailView, CreateView, FormView, UpdateView
from django.contrib.auth.decorators import login_required, permission_required
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect


class Home(ListView):
    template_name = 'music/homepage.html'
    model = Artist
    context_object_name = 'artist_list'


class Detail(ListView):
    template_name = 'music/detail.html'
    context_object_name = 'album_list'
    model = Album

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        link = self.kwargs['link']
        b = Artist.objects.get(slug__iexact=link)
        context['album_list'] = Album.objects.filter(artist=b)
        context['artist'] = b
        return context


class AlbumDetail(ListView):
    template_name = 'music/album_detail.html'
    model = Song
    context_object_name = 'page'
    paginate_by = 4
    paginate_orphans = 2

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        album = Album.objects.get(slug=self.kwargs['val2'])
        context['album'] = album
        context['artist'] = Artist.objects.get(slug=self.kwargs['val1'])
        return context

    def get_queryset(self):
        album = Album.objects.get(slug=self.kwargs['val2'])
        queryset = self.model.objects.filter(album=album)
        return queryset


class CreateMixin:
    template_name = ''
    form_class = None
    model = None

    def get(self, request, val1, val2, val3):
        a = self.model.objects.get(slug=val3)
        form = self.form_class
        b = Comment.objects.filter(song=a)
        return render(request, self.template_name,
                      {'a': a, 'b': b, 'val1': val1, 'val2': val2, 'val3': val3, 'form': form})

    def post(self, request, val1, val2, val3):
        a = self.model.objects.get(slug=val3)
        form = self.form_class(request.POST)
        text = ""
        if form.is_valid():
            form.save()
            s = Comment.objects.get(comment=form.cleaned_data.get('comment'), song=None)
            s.song = a
            s.save()
        else:
            text = form.errors.get('comment')
        b = Comment.objects.filter(song=a)
        return render(request, self.template_name,
                      {'text': text, 'a': a, 'b': b, 'val1': val1, 'val2': val2, 'val3': val3, 'form': form})


class UpdateMixin:
    template_name = ''
    form_class = None

    def get(self, request, val1, val2, val3, val4):
        comment = Comment.objects.get(id=int(val4))
        form = self.form_class(initial={'comment': comment.comment})
        return render(request, self.template_name,
                      {'comment': comment, 'val1': val1, 'val2': val2, 'val3': val3, 'val4': val4, 'form': form})

    def post(self, request, val1, val2, val3, val4):
        form = self.form_class(request.POST)
        a = Comment.objects.get(id=int(val4))
        if form.is_valid():
            form.save()
            a.comment = form.cleaned_data.get('comment')
            a.save()
            url_path = reverse('link3', kwargs={'val1': val1, 'val2': val2, 'val3': val3})
            return redirect(url_path)
        else:
            return render(request, self.template_name,
                          {'comment': 'comment', 'val1': val1, 'val2': val2, 'val3': val3, 'val4': val4, 'form': form})


class DeleteMixin:
    template_name = ''

    def get(self, request, val1, val2, val3 , val4):
        a = Comment.objects.get(id=int(val4))
        if not a:
            raise Http404
        return render(request, self.template_name, {'a': a, 'val1': val1, 'val2': val2, 'val3': val3, 'val4': val4})

    def post(self, request, val1, val2, val3 , val4):
        a = Comment.objects.get(id=int(val4))
        a.delete()
        url_path = reverse('link3', kwargs={'val1': val1, 'val2': val2, 'val3': val3})
        return redirect(url_path)

def is_member(user):
    return user.groups.filter(name='active').exits()


# @login_required(login_url="/user/login/") this would work if it was function view
class SongDetail(FormView):
    template_name = 'music/song_detail.html'
    form_class = CommentForm
    model = Song

    def form_valid(self, form):
        form.save()
        a = self.model.objects.get(slug=self.kwargs['val3'])
        s = Comment.objects.get(song=None)
        s.song = a
        s.user = self.request.user
        s.save()
        return redirect(self.get_success_url())

    def get_success_url(self):
        url_path = reverse('link3', kwargs={'val1': self.kwargs['val1'], 'val2': self.kwargs['val2'],
                                            'val3': self.kwargs['val3']})
        return url_path

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['val1'] = self.kwargs['val1']
        context['val2'] = self.kwargs['val2']
        context['val3'] = self.kwargs['val3']
        form = self.form_class()
        context['form'] = form
        a = Song.objects.get(slug=self.kwargs['val3'])
        context['a'] = a
        context['b'] = Comment.objects.filter(song=a)
        return context

    @method_decorator(login_required(login_url="/user/login/"))
    # @method_decorator(permission_required('can_comment', raise_exception=True))
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


class CommentUpdate(UpdateView):
    template_name = 'music/comment_update.html'
    form_class = CommentForm
    model = Comment

    def get_object(self, queryset=None):
        obj = self.model.objects.get(id=int(self.kwargs['val4']))
        return obj

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['val1'] = self.kwargs['val1']
        context['val2'] = self.kwargs['val2']
        context['val3'] = self.kwargs['val3']
        context['val4'] = self.kwargs['val4']
        comment = Comment.objects.get(id=int(self.kwargs['val4']))
        form = self.form_class(initial={'comment': comment.comment})
        context['form'] = form
        context['comment'] = comment
        return context

    def form_valid(self, form):
        form.save()
        url_path = reverse('link3', kwargs={'val1': self.kwargs['val1'], 'val2': self.kwargs['val2'],
                                            'val3': self.kwargs['val3']})
        return redirect(url_path)


class CommentDelete(DeleteMixin, View):
    template_name = 'music/comment_delete.html'
    model = Comment

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['val1'] = self.kwargs['val1']
        context['val2'] = self.kwargs['val2']
        context['val3'] = self.kwargs['val3']
        context['val4'] = self.kwargs['val4']
        comment = self.model.objects.get(id=int(self.kwargs['val4']))
        context['a'] = comment
        return context

    def get_success_url(self):
        url_path = reverse('link3', kwargs={'val1': self.kwargs['val1'], 'val2': self.kwargs['val2'],
                                            'val3': self.kwargs['val3']})
        return url_path


class Contact(View):
    def get(self, request):
        form = ContactForm()
        return render(request, 'music/contact.html', {'form': form})

    def post(self, request):
        form = ContactForm(request.POST)
        if form.is_valid():
            form.send_mail()
            return redirect(reverse('home'))
        else:
            return redirect(reverse('contact'))























"""template = loader.get_template('music/homepage.html')
    context = {'list': list}
    output = template.render(context,request)
    return HttpResponse(output)"""
"""try:
        b = Artist.objects.get(slug=link)
    except:
        raise Http404"""
"""template = loader.get_template('music/detail.html')
c = b.image
context = {'c': c}       # or context = Context({'c':c})
output = template.render(context,request)
return HttpResponse(output)"""
