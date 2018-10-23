from django.shortcuts import render
from app.forms import *
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login as auth_login, logout as auth_logout, authenticate
from django.contrib.auth.forms import AuthenticationForm

# Create your views here.

def landing(request):
    return render(request, 'landing.html')

def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            return redirect('app')
        else:
            return render(request, 'signup.html', {'form': form})
    else:
        form = SignupForm()
        return render(request, 'signup.html', {'form': form})

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
            context = {'result_message': 'Invalid login! Please try again.'}
            return render(request, 'login.html', context)

def logout(request):
    auth_logout(request)
    return redirect('landing')
