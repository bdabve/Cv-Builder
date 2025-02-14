from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views
from django.utils.translation import gettext_lazy as _

app_name = "resumes"

urlpatterns = [
    path(_('create/'), views.create_cv, name='create_cv'),
    path('ai-profile/', views.ai_profile, name='ai_profile'),
    path('ai-skills/', views.get_skills_ai, name='get_skills'),
    path('ai-edu-desc/', views.ai_education_description, name='ai_eductaion_desc'),
    path('ai-exp-desc/', views.ai_experience_description, name='ai_experience_desc'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
