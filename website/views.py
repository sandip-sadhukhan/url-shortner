from django.urls import resolve
from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
from .models import URLShort
from .utils import generateId

# Index page
def home(request):
    return render(request, 'website/index.html')

# short url
def short(request):
    if request.method == 'GET':
        url = request.GET.get('url', '').strip()
        if len(url) > 0:
            try:
                surl = URLShort.objects.create(url=url, sid=generateId())
            except:
                return JsonResponse({
                    'success': False,
                })
            return JsonResponse({
                'success': True,
                'url': surl.sid
            })
    
    return HttpResponse("POST request is not allowed!")


# access url
def access(request, url):
    try:
        surl = URLShort.objects.get(sid=url)
    except:
        return HttpResponse('404 Not Found')
    
    return redirect(surl.url)

