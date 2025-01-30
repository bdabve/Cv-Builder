from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.contrib.staticfiles import finders
from django.conf import settings
from weasyprint import HTML, CSS
from .forms import CVForm
from pathlib import Path


def create_cv(request):
    if request.method == 'POST':
        form = CVForm(request.POST, request.FILES)

        if form.is_valid():
            form_data = form.cleaned_data
            full_name = f"{form_data['first_name']} {form_data['last_name']}"

            # Handle Image
            profile_image_path = None
            if form_data['profile_image']:
                profile_image = form_data['profile_image']
                profile_image_path = Path(settings.MEDIA_ROOT) / profile_image.name

                with open(profile_image_path, 'wb+') as f:
                    for chunk in profile_image.chunks():
                        f.write(chunk)
            form_data['profile_image_url'] = profile_image_path

            # Handle language data
            languages = []
            for key in request.POST:
                if key.startswith("languages_"):
                    language_index = key.split("_")[1]
                    language = request.POST.get(f"languages_{language_index}")
                    proficiency = request.POST.get(f"proficiency_{language_index}")
                    if language:  # Skip empty fields
                        languages.append({'language': language, 'proficiency': int(proficiency) * "★"})
            # Add languages to form_data
            form_data['languages'] = languages

            # Handle skills
            skills = []
            for key in request.POST:
                if key.startswith("skills_") and not key.endswith("_niveau"):
                    skill_index = key.split("_")[1]
                    skill = request.POST.get(f"skills_{skill_index}")
                    niveau = request.POST.get(f"niveau_{skill_index}")
                    if skill and niveau:
                        skills.append({'skill': skill, 'niveau': niveau})

            # Add skills to the data dictionary
            form_data['skills'] = skills

            # Handle Links
            links = []
            for key in request.POST:
                if key.startswith("link_name_"):
                    link_index = key.split("_")[2]  # Extract the index
                    link_name = request.POST.get(f"link_name_{link_index}")
                    link_url = request.POST.get(f"link_url_{link_index}")
                    if link_name and link_url:
                        links.append({'name': link_name, 'url': link_url})

            # Pair link names with URLs
            form_data['links'] = links

            print(form_data)

            # Render the PDF template with form data
            # -----
            # cv_template = "resumes/cv_template.html"
            # css_url = finders.find('resumes/css/cv_template.css')

            # Simple template
            cv_template = "resumes/simple_template.html"
            css_url = finders.find('resumes/css/simple.css')
            # -----

            html_string = render_to_string(cv_template, {"data": form_data})
            css = CSS(filename=css_url)
            pdf_file = HTML(string=html_string).write_pdf(stylesheets=[css])

            # Clean up the temporary image file
            if profile_image_path and profile_image_path.exists():
                profile_image_path.unlink()

            # Return the PDF as a downloadable file
            response = HttpResponse(pdf_file, content_type="application/pdf")
            response['Content-Disposition'] = f"attachment; filename=CV_{full_name}.pdf"
            return response
    else:
        form = CVForm()

    return render(request, 'resumes/cv_form.html', {'form': form})
