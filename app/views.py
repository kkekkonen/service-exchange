from django.shortcuts import render
from app.forms import *
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login as auth_login, logout as auth_logout, authenticate
from django.http import HttpResponse, Http404, HttpResponseRedirect, JsonResponse
from django.contrib.auth.forms import AuthenticationForm
from django.core import serializers
from app.models import *
from django.contrib.auth.decorators import login_required
from django.db.models import Q
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

def count_pending(offers):
    pending = 0
    for offer in offers:
        if offer.status == "Pending":
            pending += 1
    return pending

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
             'description': r.description,
             'pending': count_pending(r.offers.all())
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
            'title': r.title,
            'minPrice': r.minPrice,
            'maxPrice': r.maxPrice,
            'category': r.category.category,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp,
            'description': r.description,
            'consumer': r.consumer.get_full_name()
        } for r in Requests]
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def request(request, id):
    if(request.method == "GET"):
        r = get_object_or_404(Request, pk=id)
        response = {
            'id': r.pk,
            'title': r.title,
            'minPrice': r.minPrice,
            'maxPrice': r.maxPrice,
            'category': r.category.category,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp,
            'description': r.description,
            'consumer': r.consumer.get_full_name(),
            'isOwner': r.consumer.pk == request.user.pk
        }
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def service(request, id):
    if(request.method == "GET"):
        r = get_object_or_404(Service, pk=id)
        response = {
            'id': r.pk,
            'title': r.title,
            'minPrice': r.minPrice,
            'maxPrice': r.maxPrice,
            'category': r.category.category,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp,
            'consumer': r.consumer.get_full_name(),
            'producer': r.producer.get_full_name(),
            'status': r.status,
            'rating': r.rating,
            'description': r.description
        }
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
    '''this function takes id and returns a service offer with the same pk.
    A service offer is an offer of service, which can be selected and purchased by any consumer.
    '''
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
    '''this function returns all the services of the current user, where the user is the consumer'''
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
    '''this function returns all the services of the current user, in which the user is the provider'''
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

@csrf_exempt
def my_offers(request):
    '''this function returns the offers made by the user'''
    if(request.method == "GET"):
        myOffers = Offer.objects.filter(provider=request.user).all()
        response = [{
             'id': r.pk,
             'title': r.title,
             'price': r.minPrice,
             'status': r.status,
             'timestamp': r.timestamp,
             'description': r.description,
             'requestId': r.request.pk
        } for r in myOffers]
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def offers(request, id):
    '''this function returns the offers of a single request'''
    if(request.method == "GET"):
        offers = get_object_or_404(Request, pk=id).offers.all()
        response = [{
             'id': r.pk,
             'title': r.title,
             'price': r.minPrice,
             'status': r.status,
             'timestamp': r.timestamp,
             'description': r.description,
             'requestId': r.request.pk
        } for r in offers]
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def offer(request, id):
    '''this function returns the specific offer if the user made the request of offer in question'''
    if(request.method == "GET"):
        offer = get_object_or_404(Offer, pk=id)
        if offer.provider is not request.user and offer.request.consumer is not request.user:
            return HttpResponse(status=403)
        response = {
             'id': offer.pk,
             'title': offer.title,
             'price': offer.minPrice,
             'status': offer.status,
             'timestamp': offer.timestamp,
             'description': offer.description,
             'requestId': offer.request.pk
        }
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

@csrf_exempt
def create_offer(request):
    '''this function creates a new offer. It takes in a form which needs the request_id of the offers target, description and price'''
    if(request.method == "POST"):
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            r = get_object_or_404(Request, pk=body['id'])
            offerDict = {
                'provider': request.user,
                'status': 'pending',
                'request': r,
                'price': body['price'],
                'description': body['description'],
                'timestamp': datetime.now()
            }
            offer = Offer(**offerDict)
            offer.save()
            return HttpResponse(status=200)
        except Exception as e:
            return HttpResponse("invalid request", status=400)
    else:
        return HttpResponse(status=405)

def accept_offer(request, id):
    '''this function is used to accept offers made by providers. It is accepted by the requests consumer'''
    offer = get_object_or_404(Offer, pk=id)
    try:
        r = offer.request
        if request.user is not r.consumer:
            return HttpResponse(status=403)
        serviceDict = {
            'title': r.title,
            'consumer': r.consumer,
            'provider': offer.provider,
            'status': 'pending',
            'price': offer.price,
            'description': r.price,
            'category': r.category,
            'zipcode': r.zipcode,
            'status': ServiceStatus.PENDING,
            'rating': 0,                          #ignore rating until status is COMPLETED
            'timestamp': datetime.now()
        }
        service = Service(**serviceDict)
        service.save()
        offer.delete()
        r.delete()
    except Exception as e:
        return HttpResponse("invalid request", status=400)
    return HttpResponse(status=200)

def accept_service_offer(request, id):
    '''this function is used to accept offers made by providers.
    It is accepted by the consumer who made the request'''
    serviceOffer = get_object_or_404(ServiceOffer, pk=id)
    try:
        serviceDict = {
            'title': serviceOffer.title,
            'consumer': request.user,
            'provider': serviceOffer.provider,
            'status': 'pending',
            'price': serviceOffer.minPrice,
            'description': serviceOffer.price,
            'category': serviceOffer.category,
            'zipcode': serviceOffer.zipcode,
            'status': ServiceStatus.PENDING,
            'rating': 0,                          #ignore rating until status is COMPLETED
            'timestamp': datetime.now()
        }
        service = Service(**serviceDict)
        service.save()
        serviceOffer.delete()
    except Exception as e:
        return HttpResponse("invalid request", status=400)
    return HttpResponse(status=200)

def decline_offer(request, id):
    offer = get_object_or_404(Offer, pk=body['id'])
    if request.user is not offer.request.consumer:
        return HttpResponse(status=403)
    offer.status = OfferStatus.REJECTED
    return HttpResponse(status=200)

def logout(request):
    auth_logout(request)
    return redirect('landing')
