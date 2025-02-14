
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = "letters"

urlpatterns = [
    path('letters/', views.letters, name='create_letters'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
