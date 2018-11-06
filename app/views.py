from django.shortcuts import render
from app.forms import *
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login as auth_login, logout as auth_logout, authenticate
from django.http import HttpResponse, Http404, HttpResponseRedirect, JsonResponse
from django.contrib.auth.forms import AuthenticationForm
from django.core import serializers
from app.models import *
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
import json

# Create your views here.

def landing(request):
    return render(request, 'landing.html')

def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            auth_login(request, user)
            return redirect('app')
        else:
            return render(request, 'signup.html', {'form': form})
    else:
        form = SignupForm()
        return render(request, 'signup.html', {'form': form})

def about(request):
        return render(request, 'about.html')

def login(request):
    if request.method == 'GET':
        form = AuthenticationForm(request)
        context = {
            'title': 'login',
            'form': form,
        }
        return render(request, 'login.html', context)
    elif request.method == 'POST':
        username = request.POST.get('username')
        raw_password = request.POST.get('password')
        user = authenticate(request, username=username, password=raw_password)
        if user is not None:
            auth_login(request, user)
            return redirect('app')
        else:
            form = AuthenticationForm(request)
            context = {
                'title': 'login',
                'form': form,
                'result_message': 'Invalid login! Please try again.'
            }
            return render(request, 'login.html', context)

@login_required
@csrf_exempt
def create_request(request):
    if(request.method == "POST"):
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            category = Category.objects.get(pk=body['category_id'])
            requestDict = {
                'title': body['title'],
                'consumer': request.user,
                'category': category,
                'minPrice': body['minPrice'],
                'maxPrice': body['maxPrice'],
                'description': body['description'],
                'zipcode': body['zipcode'],
                'timestamp': datetime.now(),
            }
            request = Request(**requestDict)
            request.save()
            return HttpResponse(status=200)
        except Exception as e:
            raise
            return HttpResponse("invalid request", status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def create_service_offer(request):
    if(request.method == "POST"):
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            user = User.objects.get(pk=body['user'])
            category = Category.objects.get(pk=body['category_id'])
            serviceDict = {
                'title': body['title'],
                'provider': user,
                'category': category,
                'minPrice': body['minPrice'],
                'maxPrice': body['maxPrice'],
                'description': body['description'],
                'zipcode': body['zipcode'],
                'timestamp': datetime.now(),
            }
            service = ServiceOffer(**serviceDict)
            service.save()
            return HttpResponse(status=200)
        except Exception as e:
            return HttpResponse("invalid request", status=400)
    else:
        return HttpResponse(status=405)

#@login_required
@csrf_exempt
def my_requests(request):
    if(request.method == "GET"):
        myRequests = Request.objects.filter(consumer=request.user).all()
        response = [{
            'id': r.pk,
             'title': r.title,
             'minPrice': r.minPrice,
             'maxPrice': r.maxPrice,
             'category': r.category.category,
             'zipcode': r.zipcode,
             'timestamp': r.timestamp,
             'description': r.description
        } for r in myRequests]
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

#@login_required
@csrf_exempt
def all_requests(request):
    if(request.method == "GET"):
        Requests = Request.objects.all()
        response = [{
            'id': r.pk,
            'title"': r.title,
            'minPrice': r.minPrice,
            'maxPrice': r.maxPrice,
            'category': r.category.category,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp,
            'description': r.description,
            'consumer': r.consumer
        } for r in Requests]
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def request(request, id):
    if(request.method == "GET"):
        Request = Request.objects.get_object_or_404(pk=id)
        response = {
            'id': r.pk,
            'title"': r.title,
            'minPrice': r.minPrice,
            'maxPrice': r.maxPrice,
            'category': r.category.category,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp,
            'description': r.description,
            'consumer': r.consumer
        } in Request
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def service(request, id):
    if(request.method == "GET"):
        Service = Service.objects.get_object_or_404(pk=id)
        response = {
            'id': r.pk,
            'title': r.title,
            'minPrice': r.minPrice,
            'maxPrice': r.maxPrice,
            'category': r.category.category,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp,
            'consumer': r.consumer,
            'producer': r.producer,
            'status': r.status,
            'rating': r.rating,
            'description': r.description
        } in Service
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def all_service_offers(request):
    if(request.method == "GET"):
        ServiceOffers = ServiceOffer.objects.all()
        response = [{
            'id': r.pk,
            'title': r.title,
            'minPrice': r.minPrice,
            'maxPrice': r.maxPrice,
            'category': r.category.category,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp,
            'description': r.description,
            'provider': r.provider.get_full_name()
        } for r in ServiceOffers]
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def service_offer(request, id):
    if(request.method == "GET"):
        r = get_object_or_404(ServiceOffer, pk=id)
        response = {
            'id': r.pk,
            'title': r.title,
            'minPrice': r.minPrice,
            'maxPrice': r.maxPrice,
            'category': r.category.category,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp,
            'description': r.description,
            'provider': r.provider.get_full_name()
        }
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def my_service_offers(request):
    if(request.method == "GET"):
        ServiceOffers = ServiceOffer.objects.filter(provider=request.user)
        response = [{
            'id': r.pk,
            'title': r.title,
            'minPrice': r.minPrice,
            'maxPrice': r.maxPrice,
            'category': r.category.category,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp,
            'description': r.description,
            'provider': r.provider
        } for r in ServiceOffers]
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def my_consumer_services(request):
    if(request.method == "GET"):
        Services = Service.objects.filter(consumer=request.user)
        response = [{
            'id': r.pk,
            'title': r.title,
            'minPrice': r.minPrice,
            'maxPrice': r.maxPrice,
            'category': r.category.category,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp,
            'consumer': r.consumer,
            'producer': r.producer,
            'status': r.status,
            'rating': r.rating,
            'description': r.description
        } for r in Services]
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def my_provider_services(request):
    if(request.method == "GET"):
        Services = Service.objects.filter(provider=request.user)
        response = [{
            'id': r.pk,
            'title': r.title,
            'minPrice': r.minPrice,
            'maxPrice': r.maxPrice,
            'category': r.category.category,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp,
            'consumer': r.consumer,
            'producer': r.producer,
            'status': r.status,
            'rating': r.rating,
            'description': r.description
        } for r in Services]
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

@csrf_exempt
@login_required
def categories(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if(request.method == "GET"):
        categories = Category.objects.all()
        response = [{
            'id': r.pk,
            'category': r.category,
        } for r in categories]
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

def logout(request):
    auth_logout(request)
    return redirect('landing')
