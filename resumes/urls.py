from django.urls import path
from . import views


urlpatterns = [
    path('create/', views.create_cv, name='create_cv'),
    # path('download-cv/', views.download_cv, name='download_cv'),
]
