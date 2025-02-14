from django import forms
from django.utils.translation import gettext_lazy as _


class CVForm(forms.Form):
    poste = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "e.g: Enseignant", "class": "form-control"}),
        max_length=200,
        label=_("Post Title")
    )
    profile_image = forms.ImageField(
        widget=forms.ClearableFileInput(attrs={"class": "form-control"}),
        label=_("Profile Image"),
        required=False
    )

    # ---- First, Last name
    first_name = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "First name", "class": "form-control"}),
        max_length=200,
        label=_("Name")
    )
    last_name = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "Last Name", "class": "form-control"}),
        max_length=200,
        label=_("Last name")
    )

    # ---- Email Phone
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={'placeholder': 'Enter Email Address', "class": "form-control"}),
        label=_("Email")
    )
    phone = forms.CharField(
        widget=forms.TextInput(attrs={"class": "form-control", 'placeholder': 'Enter Phone Number'}),
        max_length=20,
        label=_("Phone")
    )

    # -- Ville, Paye
    ville = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Enter your address', "class": "form-control"}),
        max_length=200,
        label=_("City")
    )
    paye = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Your Country', "class": "form-control"}),
        max_length=200,
        label=_("Country")
    )

    # -- Address, CodePostal
    address = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Address', "class": "form-control"}),
        max_length=200,
        label=_('Address'),
        required=False)

    code_postal = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Code Postal', "class": "form-control"}),
        max_length=100,
        label=_('Postal Code'),
        required=False
    )

    # -- Situation Familiale, Permis
    sit_family = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "Situation Familiale", "class": "form-control"}),
        max_length=200,
        label=_("Family Situation"),
        required=False
    )
    permis = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'e.g Permis B', "class": "form-control"}),
        max_length=100,
        label=_('Driving License'),
        required=False
    )

    # -- D.Naissance, Profile
    d_naissance = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date', "class": "form-control"}),
        label=_('Date of Birth'),
        required=False
    )
    profile = forms.CharField(
        widget=forms.Textarea(attrs={"placeholder": "Your Resume", "rows": 5, "class": "form-control"}),
        label=_("Profile"),
        required=False
    )
    # --------------------------------------------------------------------
    # Education
    # edu_ecole = forms.CharField(
        # widget=forms.TextInput(attrs={"class": "form-control", "placeholder": "Ecole"}),
        # max_length=200,
        # label="Ecole"
    # )
    # edu_diplome = forms.CharField(
        # widget=forms.TextInput(attrs={"class": "form-control", "placeholder": "Diplôme"}),
        # max_length=200,
        # label="Diplôme"
    # )

    # -- Start-date, End-date
    # edu_start_date = forms.DateField(
        # widget=forms.DateInput(attrs={'type': 'date', "class": "form-control"}),
        # label="Start Date", required=False)

    # edu_end_date = forms.DateField(
        # widget=forms.DateInput(attrs={"class": "form-control", 'type': 'date'}), label="End Date", required=False)

    # -- Ville, Description
    # edu_ville = forms.CharField(
        # widget=forms.TextInput(attrs={"class": "form-control", "list": "detailsVille", "placeholder": "Ville"}),
        # max_length=200, label="Ville", required=False)

    # edu_description = forms.CharField(
        # widget=forms.Textarea(attrs={
            # 'placeholder': 'Par exemple: diplôme avec mention trés bien.',
            # "rows": 5,
            # "class": "form-control"
        # }),
        # label="Déscription",
        # required=False
    # )
    # ---------------------------------------------------------------------
    # Experience fields
    # exp_post_title = forms.CharField(
        # widget=forms.TextInput(attrs={'placeholder': 'Poste Title', "class": "form-control"}),
        # max_length=200,
        # label="Titre du post"
    # )
    # exp_employee = forms.CharField(
        # widget=forms.TextInput(attrs={'placeholder': 'Employee', "class": "form-control"}),
        # max_length=200,
        # label="Employer"
    # )
    # exp_start_date = forms.DateField(
        # widget=forms.DateInput(attrs={'type': 'date', "class": "form-control"}),
        # label="Start Date",
        # required=False
    # )
    # exp_end_date = forms.DateField(
        # widget=forms.DateInput(attrs={'type': 'date', "class": "form-control"}),
        # label="End Date",
        # required=False
    # )

    # exp_ville = forms.CharField(
        # widget=forms.TextInput(attrs={'placeholder': 'Ville', "class": "form-control"}),
        # max_length=200,
        # label="Ville",
        # required=False
    # )
    # exp_description = forms.CharField(
        # widget=forms.Textarea(attrs={
            # "placeholder": "Inclure 2 ou 3 phrases claires au sujet de votre expérience globale.",
            # "rows": 5,
            # "class": "form-control"
        # }),
        # label="Description",
        # required=False,
    # )
