"""service URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from app import views

urlpatterns = [
    path(r'', views.landing, name='landing'),
    path('index/', views.landing, name='landing'),
    path('admin/', admin.site.urls),
    re_path('app/', TemplateView.as_view(template_name='index.html'), name='app'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('logout/', views.logout, name='logout'),
    path('api/create_request', views.create_request, name='create_request'),
    path('api/my_requests', views.my_requests, name='my_request'),
    path('api/all_requests', views.all_requests, name='all_request'),
    path('api/categories', views.categories, name='categories'),
]
