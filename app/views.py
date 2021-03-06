from django.shortcuts import render
from app.forms import *
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login as auth_login, logout as auth_logout, authenticate
from django.http import HttpResponse, Http404, HttpResponseRedirect, JsonResponse
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import update_session_auth_hash
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

def privacy_policy(request):
        return render(request, 'privacy_policy.html')

def terms_of_service(request):
        return render(request, 'terms_of_service.html')

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
            category = Category.objects.get(pk=body['category_id'])
            serviceDict = {
                'title': body['title'],
                'provider': request.user,
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
        if offer.status == "PENDING":
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
        Requests = Request.objects.filter(~Q(consumer=request.user)).all()
        response = [{
            'id': r.pk,
            'title': r.title,
            'minPrice': r.minPrice,
            'maxPrice': r.maxPrice,
            'category': r.category.category,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp,
            'description': r.description,
            'consumer': r.consumer.get_full_name(),
            'consumerid': r.consumer.pk
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
            'categoryid': r.category.pk,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp.strftime("%d.%m.%Y"),
            'description': r.description,
            'consumer': r.consumer.get_full_name(),
            'consumerid': r.consumer.pk,
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
            'price': r.price,
            'category': r.category.category,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp.strftime("%d.%m.%Y"),
            'consumer': r.consumer.get_full_name(),
            'consumerid': r.consumer.pk,
            'provider': r.provider.get_full_name(),
            'providerid': r.provider.pk,
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
        ServiceOffers = ServiceOffer.objects.filter(~Q(provider=request.user)).all()
        response = [{
            'id': r.pk,
            'title': r.title,
            'minPrice': r.minPrice,
            'maxPrice': r.maxPrice,
            'category': r.category.category,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp.strftime("%d.%m.%Y"),
            'description': r.description,
            'provider': r.provider.get_full_name(),
            'providerid': r.provider.pk
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
            'categoryid': r.category.pk,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp.strftime("%d.%m.%Y"),
            'description': r.description,
            'provider': r.provider.get_full_name(),
            'providerid': r.provider.pk
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
            'categoryid': r.category.pk,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp,
            'description': r.description,
            'provider': r.provider.get_full_name(),
            'providerid': r.provider.pk
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
            'price': r.price,
            'category': r.category.category,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp,
            'consumer': r.consumer.get_full_name(),
            'consumerid': r.consumer.pk,
            'provider': r.provider.get_full_name(),
            'providerid': r.provider.pk,
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
            'price': r.price,
            'category': r.category.category,
            'zipcode': r.zipcode,
            'timestamp': r.timestamp,
            'consumer': r.consumer.get_full_name(),
            'consumerid': r.consumer.pk,
            'provider': r.provider.get_full_name(),
            'providerid': r.provider.pk,
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
             'price': r.price,
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
        offers = get_object_or_404(Request, pk=id).offers.filter(~Q(status='REJECTED')).all()
        response = [{
             'id': r.pk,
             'price': r.price,
             'status': str(r.status),
             'timestamp': r.timestamp,
             'description': r.description,
             'provider': r.provider.get_full_name(),
             'providerid': r.provider.pk,
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
                'timestamp': datetime.now(tz=timezone.utc)
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
        if request.user.pk is not r.consumer.pk:
            return HttpResponse(status=403)
        serviceDict = {
            'serviceOffer': None,
            'title': r.title,
            'consumer': r.consumer,
            'provider': offer.provider,
            'status': 'pending',
            'price': offer.price,
            'description': offer.price,
            'category': r.category,
            'zipcode': r.zipcode,
            'status': "PENDING",
            'rating': 0,                          #ignore rating until status is COMPLETED
            'timestamp': datetime.now(tz=timezone.utc)
        }
        service = Service(**serviceDict)
        service.save()
        offer.delete()
        r.delete()
    except Exception as e:
        print(e)
        return HttpResponse("invalid request", status=400)
    return HttpResponse(status=200)

def accept_service_offer(request, id):
    '''this function is used to accept offers made by providers.
    It is accepted by the consumer who made the request'''
    serviceOffer = get_object_or_404(ServiceOffer, pk=id)
    try:
        check = Service.objects.get(serviceOffer=serviceOffer.pk, consumer=request.user)
        return HttpResponse(status=400)
    except Service.DoesNotExist:
        check = None
    try:
        if check == None:
            serviceDict = {
                'serviceOffer': serviceOffer.pk,
                'title': serviceOffer.title,
                'consumer': request.user,
                'provider': serviceOffer.provider,
                'status': 'pending',
                'price': serviceOffer.minPrice,
                'description': serviceOffer.description,
                'category': serviceOffer.category,
                'zipcode': serviceOffer.zipcode,
                'status': "PENDING",
                'rating': 0,                          #ignore rating until status is COMPLETED
                'timestamp': datetime.now(tz=timezone.utc)
            }
            service = Service(**serviceDict)
            service.save()
    except Exception as e:
        return HttpResponse("invalid request", status=400)
    return HttpResponse(status=200)

def decline_offer(request, id):
    offer = get_object_or_404(Offer, pk=id)
    print(request.user.pk)
    print(offer.request.consumer.pk)
    if request.user.pk is not offer.request.consumer.pk:
        return HttpResponse(status=403)
    offer.status = "REJECTED"
    offer.save()
    return HttpResponse(status=200)

@csrf_exempt
@login_required
def logged_user_profile(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    if (request.method == "GET"):
        user = request.user
        response = {
            'id': user.id,
            'username': user.username,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'email': user.email,
        }
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

@csrf_exempt
@login_required
def user_profile(request, id):
    if (request.method == "GET"):
        user = User.objects.get(pk=id)
        response = {
            'id': user.pk,
            'username': user.username,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'email': user.email,
        }
        return JsonResponse(response, safe=False)
    else:
        return HttpResponse(status=405)

def logout(request):
    auth_logout(request)
    return redirect('landing')

@csrf_exempt
@login_required
def edit_request(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        service_request = get_object_or_404(Request, pk=body['id'])
        category = get_object_or_404(Category, pk=body['category_id'])
        if(request.user == service_request.consumer):
            service_request.title = body['title']
            service_request.category = category
            service_request.maxPrice = body['maxPrice']
            service_request.minPrice = body['minPrice']
            service_request.description = body['description']
            service_request.zipcode = body['zipcode']
            service_request.save()
            return HttpResponse(status=200)
        return HttpResponse(status=403)
    else:
        return HttpResponse(status=405)

@csrf_exempt
@login_required
def edit_service_offer(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        service_offer = get_object_or_404(ServiceOffer, pk=body['id'])
        category = get_object_or_404(Category, pk=body['category_id'])
        if(request.user == service_offer.provider):
            service_offer.title = body['title']
            service_offer.category = category
            service_offer.minPrice = body['minPrice']
            service_offer.description = body['description']
            service_offer.zipcode = body['zipcode']
            service_offer.save()
            return HttpResponse(status=200)
        return HttpResponse(status=403)
    else:
        return HttpResponse(status=405)

@csrf_exempt
@login_required
def edit_profile(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user = request.user
        user.username = body['username']
        user.first_name = body['first_name']
        user.last_name = body['last_name']
        user.email = body['email']
        user.save()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=405)

@csrf_exempt
@login_required
def change_password(request):
    if request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user = request.user
        password = body['password']
        newPassword1 = body['newPassword1']
        newPassword2 = body['newPassword2']
        if user.check_password(password) and newPassword1 == newPassword2:
            user.set_password(newPassword1)
            user.save()
            update_session_auth_hash(request, user)
            return HttpResponse(status=200)
        return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

@csrf_exempt
@login_required
def delete_request(request, id):
    if request.method == "DELETE":
        service_request = get_object_or_404(Request, pk=id)
        if(service_request.consumer == request.user):
            service_request.delete()
            return HttpResponse(status=200)
        return HttpResponse(status=403)
    else:
        return HttpResponse(status=405)

@csrf_exempt
@login_required
def delete_request_offer(request, id):
    if request.method == "DELETE":
        offer = get_object_or_404(Offer, pk=id)
        if(offer.provider == request.user):
            offer.delete()
            return HttpResponse(status=200)
        return HttpResponse(status=403)
    else:
        return HttpResponse(status=405)

@csrf_exempt
@login_required
def delete_service_offer(request, id):
    if request.method == "DELETE":
        service_offer = get_object_or_404(ServiceOffer, pk=id)
        if(service_offer.provider == request.user):
            service_offer.delete()
            return HttpResponse(status=200)
        return HttpResponse(status=403)
    else:
        return HttpResponse(status=405)
