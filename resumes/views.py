from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template.loader import render_to_string
from django.contrib.staticfiles import finders
from django.conf import settings
from weasyprint import HTML, CSS
from .forms import CVForm
from pathlib import Path
from . import ai_functions as ai


def ai_profile(request):
    if request.method == "POST":
        job_title = request.POST.get('job_title')
        if not job_title:
            return JsonResponse({'status': 'error', 'message': 'Job title is required'})

        result = ai.generate_profile(job_title)
        return JsonResponse(result)


def ai_education_description(request):
    if request.method == 'POST':
        diploma = request.POST.get('diploma')
        if not diploma or len(diploma) < 1:
            return JsonResponse({'status': 'error', 'message': 'diploma input is required'})
        result = ai.generate_education_description(diploma)
        return JsonResponse(result)


def ai_experience_description(request):
    if request.method == 'POST':
        job_title = request.POST.get('job_title')
        if not job_title or len(job_title) < 1:
            return JsonResponse({'status': 'error', 'message': 'Job Title input is required'})
        result = ai.generate_experience_description(job_title)
        return JsonResponse(result)


def get_skills_ai(request):
    if request.method == "POST":
        job_title = request.POST.get('job_title')
        if not job_title or len(job_title) < 1:
            return JsonResponse({'status': 'error', 'message': 'Job title is required'})

        result = ai.generate_skills(job_title)
        return JsonResponse(result)


# ==============
# Form Handle
# =============
def formate_date_fields(date):
    from datetime import datetime
    if date == '':
        return
    return datetime.strptime(date, '%Y-%m-%d').strftime('%m/%Y')


def handle_uploaded_image(profile_image):
    """Handle saving the uploaded profile image and return its path."""
    if profile_image:
        profile_image_path = Path(settings.MEDIA_ROOT) / profile_image.name
        try:
            with open(profile_image_path, 'wb+') as f:
                for chunk in profile_image.chunks():
                    f.write(chunk)

            # return profile_image_path
            profile_image_url = Path(settings.MEDIA_URL) / profile_image.name
            return profile_image_url
        except Exception as e:
            print(f"Error saving image: {e}")
    return None


def extract_languages(request):
    """Extract language proficiency data from the request."""
    languages = []
    for key in request.POST:
        if key.startswith("languages_"):
            language_index = key.split("_")[1]
            language = request.POST.get(f"languages_{language_index}")
            proficiency = request.POST.get(f"proficiency_{language_index}")
            if language:
                languages.append({'language': language, 'proficiency': int(proficiency) * "★"})
    return languages


def extract_skills(request):
    """Extract skill data from the request."""
    skills = []
    for key in request.POST:
        if key.startswith("skills_") and not key.endswith("_niveau"):
            skill_index = key.split("_")[1]
            skill = request.POST.get(f"skills_{skill_index}")
            niveau = request.POST.get(f"niveau_{skill_index}")
            if skill and niveau:
                skills.append({'skill': skill, 'niveau': niveau})
    return skills


def extract_links(request):
    """Extract link data from the request."""
    links = []
    for key in request.POST:
        if key.startswith("link_name_"):
            link_index = key.split("_")[2]
            link_name = request.POST.get(f"link_name_{link_index}")
            link_url = request.POST.get(f"link_url_{link_index}")
            if link_name and link_url:
                links.append({'name': link_name, 'url': link_url})
    return links


def extract_education(request):
    """Extract experience data from the request."""
    educations = []
    for key in request.POST:
        if key.startswith("edu_ecole"):
            edu_index = key.split("_")[-1]  # Extract experience index
            edu_ecole = request.POST.get(f"edu_ecole_{edu_index}", "")
            edu_diplome = request.POST.get(f"edu_diplome_{edu_index}", "")
            edu_start_date = request.POST.get(f"edu_start_date_{edu_index}", "")
            edu_end_date = request.POST.get(f"edu_end_date_{edu_index}", "")
            edu_ville = request.POST.get(f"edu_ville_{edu_index}", "")
            edu_description = request.POST.get(f"edu_description_{edu_index}", "")

            edu_desc_as_list = request.POST.get(f"edu_desc_aslist_{edu_index}", "")
            if edu_desc_as_list == "1":
                edu_description = edu_description.split('\r\n')

            if edu_ecole and edu_diplome:
                educations.append({
                    'edu_ecole': edu_ecole,
                    'edu_diplome': edu_diplome,
                    'edu_start_date': formate_date_fields(edu_start_date),
                    'edu_end_date': formate_date_fields(edu_end_date),
                    'edu_ville': edu_ville,
                    'edu_description': edu_description
                })
    return educations


def extract_experience(request):
    """Extract experience data from the request."""
    experiences = []
    for key in request.POST:
        if key.startswith("exp_post_title"):
            exp_index = key.split("_")[-1]  # Extract experience index
            exp_post_title = request.POST.get(f"exp_post_title_{exp_index}", "")
            exp_employee = request.POST.get(f"exp_employee_{exp_index}", "")
            exp_start_date = request.POST.get(f"exp_start_date_{exp_index}", "")
            exp_end_date = request.POST.get(f"exp_end_date_{exp_index}", "")
            exp_ville = request.POST.get(f"exp_ville_{exp_index}", "")
            exp_description = request.POST.get(f"exp_description_{exp_index}", "")

            exp_desc_as_list = request.POST.get(f"exp_desc_aslist_{exp_index}", "")
            if exp_desc_as_list == "1":
                exp_description = exp_description.split('\r\n')

            if exp_post_title and exp_employee:
                experiences.append({
                    'exp_post_title': exp_post_title,
                    'exp_employee': exp_employee,
                    'exp_start_date': formate_date_fields(exp_start_date),
                    'exp_end_date': formate_date_fields(exp_end_date),
                    'exp_ville': exp_ville,
                    'exp_description': exp_description
                })
    return experiences


def create_cv(request):
    """Handle CV form submission and generate a PDF."""
    if request.method == 'POST':
        form = CVForm(request.POST, request.FILES)

        if form.is_valid():
            form_data = form.cleaned_data
            print('-' * 100)
            print(request.POST)
            print('*' * 100)
            full_name = f"{form_data['first_name']} {form_data['last_name']}"

            # Handle Image Upload
            profile_image_path = handle_uploaded_image(form_data.get('profile_image'))
            form_data['profile_image_url'] = profile_image_path
            # form_data['profile_image_url'] = request.build_absolute_uri(profile_image_path)

            # Extract form data
            form_data['languages'] = extract_languages(request)
            form_data['skills'] = extract_skills(request)
            form_data['links'] = extract_links(request)
            form_data['experiences'] = extract_experience(request)
            form_data['educations'] = extract_education(request)

            print('-' * 100)
            for key, value in form_data.items():
                print(key)
                print('-' * len(key))
                print(value)
                print('-' * 100)

            # Select Template and CSS file
            selected_template = request.POST.get("selected_template", "simple_template.html")
            if selected_template == '':
                selected_template = 'simple_template.html'

            elif selected_template == 'simple_template.html':
                css_url = finders.find('resumes/css/simple.css')

            elif selected_template == 'bleu_template.html':
                css_url = finders.find('resumes/css/cv_template.css')

            elif selected_template == 'grey_template.html':
                css_url = finders.find('resumes/css/grey_template.css')

            elif selected_template == 'new_york.html':
                css_url = finders.find('resumes/css/new_york.css')

            cv_template = f"resumes/{selected_template}"
            output_type = request.POST.get('output_type', 'view')

            if output_type == 'pdf':
                # Render PDF
                html_string = render_to_string(cv_template, {"data": form_data})
                css = CSS(filename=css_url)
                pdf_file = HTML(string=html_string).write_pdf(stylesheets=[css])

                # Clean up temporary image file
                if profile_image_path and profile_image_path.exists():
                    profile_image_path.unlink()

                # Return the PDF as a downloadable file
                response = HttpResponse(pdf_file, content_type="application/pdf")
                response['Content-Disposition'] = f"attachment; filename=CV_{full_name}.pdf"
                return response

            else:
                # render for view
                return render(request, cv_template, {"data": form_data})
    else:
        form = CVForm()

    templates = [
        {
            # template for the Idea of this project
            "filename": "bleu_template.html",
            "name": "Project Idea Template CV",
            "image_url": "/static/images/bleu_template.png"
        },
        # Simple Template
        {
            "filename": "simple_template.html",
            "name": "Simple Template CV",
            "image_url": "/static/images/simple_template.png"
        },
        # Grey template
        {
            "filename": "grey_template.html",
            "name": "Grey Template CV",
            "image_url": "/static/images/grey_template.png"
        },
        # New York template
        {
            "filename": "new_york.html",
            "name": "New York",
            "image_url": "/static/images/new_york.png"
        },
    ]

    return render(request, 'resumes/cv_form.html', {'form': form, 'templates': templates})
