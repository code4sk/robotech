from django.http import HttpResponse, Http404
from music.models import *
from django.template import loader, Context
from django.shortcuts import get_object_or_404, render_to_response


def homepage(request):
    list = Artist.objects.all()
    return render_to_response('music/homepage.html', {'list': list})


def detail(request, link):
    b = get_object_or_404(Artist, slug__iexact=link)
    d = Album.objects.all()
    return render_to_response('music/detail.html', {'c': b.image, 'd': d, 'b': b, 'l': link})


def album_detail(request):
    a = Song.objects.all()
    b = Album.objects.get(album_title='Red')
    return render_to_response('music/album_detail.html',{'a': a, 'b': b})





















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
