from django import forms


class CVForm(forms.Form):
    poste = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "e.g: Enseignant"}),
        max_length=200,
        label="Titre du Poste"
    )
    profile_image = forms.ImageField(label="Profile Image", required=False)

    first_name = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "First name"}),
        max_length=200,
        label="Nom"
    )
    last_name = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "Last Name"}),
        max_length=200,
        label="Nom de Famille"
    )

    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'Enter Email Address'}), label="Email")
    phone = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Enter Phone Number'}), max_length=20, label="Phone")

    ville = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Enter your address'}),
        max_length=200,
        label="Ville"
    )
    paye = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Your Country'}),
        max_length=200,
        label="Payé"
    )
    address = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Address'}),
        max_length=200,
        label='Address',
        required=False)
    code_postal = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Code Postal'}),
        max_length=100,
        label='Code Postal',
        required=False
    )
    sit_family = forms.CharField(
        widget=forms.TextInput(attrs={"placeholder": "Situation Familiale"}),
        max_length=200,
        label="Situation Familiale",
        required=False
    )
    permis = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'e.g Permis B'}),
        max_length=100,
        label='Permis de Conduire',
        required=False
    )
    d_naissance = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date'}),
        label='Date de Naissance',
        required=False
    )
    profile = forms.CharField(
        widget=forms.Textarea(attrs={"placeholder": "Your Resume", "rows": 5}),
        label="Profile",
        required=False
    )
    # --------------------------------------------------------------------
    # Education
    edu_ecole = forms.CharField(max_length=200, label="Ecole")
    edu_diplome = forms.CharField(max_length=200, label="Diplôme")
    edu_start_date = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}), label="Start Date", required=False)
    edu_end_date = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}), label="End Date", required=False)
    edu_ville = forms.CharField(max_length=200, label="Ville", required=False)
    edu_description = forms.CharField(
        widget=forms.Textarea(attrs={
            'placeholder': 'Par exemple: diplôme avec mention trés bien.',
            "rows": 5,
        }),
        label="Déscription",
        required=False
    )
    # ---------------------------------------------------------------------
    # Experience fields
    exp_post_title = forms.CharField(max_length=200, label="Titre du post")
    exp_employee = forms.CharField(max_length=200, label="Employer")
    exp_start_date = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}), label="Start Date", required=False)
    exp_end_date = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}), label="End Date", required=False)
    exp_ville = forms.CharField(max_length=200, label="Ville", required=False)
    exp_description = forms.CharField(
        widget=forms.Textarea(attrs={
            "placeholder": "Inclure 2 ou 3 phrases claires au sujet de votre expérience globale.",
            "rows": 5,
        }),
        label="Description",
        required=False,
    )
