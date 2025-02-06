from django.urls import path
from . import views


urlpatterns = [
    path('create/', views.create_cv, name='create_cv'),
    path('ai-profile/', views.ai_profile, name='ai_profile'),
    path('ai-skills/', views.get_skills_ai, name='get_skills'),
    path('ai-edu-desc/', views.ai_education_description, name='ai_eductaion_desc'),
]
