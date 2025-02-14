from django.shortcuts import render


# Create your views here.
def letters(request):

    return render(request, 'letters/create_letters.html', {'navbar': 'letters'})
