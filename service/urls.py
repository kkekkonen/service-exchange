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
    path('about/', views.about, name='about'),
    path('privacy_policy/', views.privacy_policy, name='privacy_policy'),
    path('terms_of_service/', views.terms_of_service, name='terms_of_service'),
    path('logout/', views.logout, name='logout'),
    path('api/create_request', views.create_request, name='create_request'),
    path('api/my_requests', views.my_requests, name='my_request'),
    path('api/all_requests', views.all_requests, name='all_request'),
    path('api/my_service_offers', views.my_service_offers, name='my_service_offers'),
    path('api/categories', views.categories, name='categories'),
    path('api/logged_user_profile', views.logged_user_profile, name='logged_user_profile'),
    path('api/user_profile/<int:id>/', views.user_profile, name='user_profile'),
    path('api/all_service_offers', views.all_service_offers, name='all_service_offers'),
    path('api/my_provider_services', views.my_provider_services, name='my_provider_services'),
    path('api/my_consumer_services', views.my_consumer_services, name='my_consumer_services'),
    path('api/create_service_offer', views.create_service_offer, name='create_service_offer'),
    path('api/request/<int:id>/', views.request),
    path('api/service_offer/<int:id>/', views.service_offer),
    path('api/service/<int:id>/', views.service),
    path('api/get_offers', views.my_offers),                                                    #get all the offers made by the user        GET
    path('api/get_offers/<int:id>', views.offer),                                               #get single offer with its id               GET
    path('api/create_offer', views.create_offer),                                               #create offer                               POST
    path('api/get_request_offers/<int:id>', views.offers),                                      #get offers for a request                   GET
    path('api/accept_offer/<int:id>', views.accept_offer),                                      #accept offer                               GET
    path('api/accept_service_offer/<int:id>', views.accept_service_offer),                      #accept serviceoffer                        GET
    path('api/decline_offer/<int:id>', views.decline_offer),                                    #decline offer                              GET
    path('api/edit_request', views.edit_request),                                               #edit request                               PUT
    path('api/edit_service_offer', views.edit_service_offer),                                   #edit serviceoffer                          PUT
    path('api/edit_profile', views.edit_profile),                                               #edit profile                               PUT
    path('api/delete_request/<int:id>', views.delete_request),                                  #delete request                             PUT 
    path('api/delete_service_offer/<int:id>', views.delete_service_offer),                      #delete serviceoffer                        DELETE
    path('api/delete_request_offer/<int:id>', views.delete_request_offer),                      #edit requestoffer                          DELETE
]
