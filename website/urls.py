from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('s/', views.short, name='short'),
    path('<str:url>/', views.access, name='access')
]
