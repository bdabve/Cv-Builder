$(document).ready(function() {
    //$(".accordion-content").hide(); // Hide all sections initially
    // Enabling ToolTip
    $('[data-bs-toggle="tooltip"]').tooltip();

    let languageCount = 1;
    let skillCount = 1;
    let linkCount = 1;
    let experienceCount = 1;

    // Common Skills
    let commonSkills = [];

    // Function to get the CSRF token from the cookie
    function getCSRFToken() {
        var name = 'csrftoken=';
        var value = document.cookie.split(';').find(row => row.trim().startsWith(name));
        return value ? value.split('=')[1] : null;
    }

    // Refresh Common Skills
    function refreshCommonSkills() {
        $("#common-skills").empty();
        commonSkills.slice(0, 10).forEach(skill => {
            $("#common-skills").append(`<div class="skill">${skill}&nbsp;<i class="bi bi-plus"></i></div>`);
        });
    }
    refreshCommonSkills();

    // Remove
    $(document).on("click", ".remove-btn", function() {
        $(this).closest(".content-div").fadeOut(300, function() { $(this).remove(); });
    });

    // Skills
    function createSkillRow(skillName = "") {
        let newSkillRow = $(`
            <div class="row mb-3 content-div fade-in">
                <div class="col">
                    <input type="text" name="skills_${skillCount}" value="${skillName}"
                           placeholder="Enter a skill" class="form-control">
                </div>
                <div class="col d-flex justify-content-between">
                    <select name="niveau_${skillCount}" class="form-select">
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                    <button type="button" class="btn btn-outline-danger btn-sm remove-btn ms-1">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `);
        $("#skills-container").append(newSkillRow);
        skillCount++;
    }

    // Add Skills From "Add" Button
    $("#add-skill-btn").click(function () {
        createSkillRow();
    });

    // Add Skills from Common Skills
    $("#common-skills").on("click", ".skill", function () {
        let selectedSkill = $(this).text().trim().replace("+", "").trim();
        let skillExists = $('#skills-container input[name^="skills_"]').filter(function () {
            return $(this).val() === selectedSkill;
        }).length > 0;

        if (!skillExists) {
            createSkillRow(selectedSkill);
            commonSkills = commonSkills.filter(skill => skill !== selectedSkill);
            //refreshCommonSkills();
        }

        $(this).fadeOut(300, function () { $(this).remove(); });
        console.log(commonSkills)
    });

    // AI
    $("#ai-poste-skills").on("click", function(e) {
        e.preventDefault();
        let jobTitle = $('#id_poste').val();
        console.log('Getting Skills for JobTitle: ', jobTitle)
        if (jobTitle.length > 2) {
            $.ajax({
                url: '/resumes/get-skills/',  // The URL of your Django view
                method: 'POST',
                data: {
                    job_title: jobTitle,  // The key you're sending to the Django view
                    //csrfmiddlewaretoken: '{{ csrf_token }}',  // CSRF token for security
                },
                beforeSend: function(xhr) {
                    // Add CSRF token
                    xhr.setRequestHeader('X-CSRFToken', getCSRFToken());
                },
                success: function(response) {
                    if ( response.status == 'success' ) {
                        refreshCommonSkills()
                        skills = response.ai_skills;  // Display the response from Django
                        let commonSkills = skills
                        $.each(skills, function(index, skill) {
                            $("#common-skills").append(`<div class="skill">${skill}&nbsp;<i class="bi bi-plus"></i></div>`);
                        });
                    } else {
                        alert('Error getting skills', response.message);
                    }
                },
                error: function(xhr, status, error) {
                    console.log(response)
                    console.log('Error:', error);
                }
            });
        } else {
            console.log('You must provide a job title to get data.');
        }
    });

    // Language Add
    $("#add-language-btn").click(function() {
        let newLanguageRow = $(`
            <div class="row mb-3 content-div fade-in">
                <div class="col">
                    <input type="text" name="languages_${languageCount}" placeholder="Enter a language" class="form-control">
                </div>
                <div class="col d-flex justify-content-between">
                    <select name="proficiency_${languageCount}" class="form-select">
                        <option value="1">Beginner</option>
                        <option value="2">Intermediate</option>
                        <option value="3">Fluent</option>
                        <option value="4">Maternal</option>
                    </select>
                    <button type="button" class="btn remove-btn btn-danger ms-2">Remove</button>
                </div>
            </div>
        `);
        $("#languages-container").append(newLanguageRow);
        languageCount++;
    });

    // Links
    $("#add-link-btn").click(function() {
        let newLinkRow = $(`
            <div class="row mb-3 content-div fade-in">
                <div class="col">
                    <input type="text" name="link_name_${linkCount}"
                           placeholder="Enter link name (e.g., YouTube)" class="form-control">
                </div>
                <div class="col d-flex justify-content-between">
                    <input type="url" name="link_url_${linkCount}" placeholder="Enter link URL" class="form-control">
                    <button type="button" class="btn remove-btn btn-danger ms-2">Remove</button>
                </div>
            </div>
        `);
        $("#links-container").append(newLinkRow);
        linkCount++;
    });


    // AI
    $("#ai-poste-profile").on("click", function(e) {
        e.preventDefault();
        let jobTitle = $('#id_poste').val();
        if (jobTitle.length > 2) {
            $.ajax({
                url: '/resumes/ai-profile/',  // The URL of your Django view
                method: 'POST',
                data: {
                    job_title: jobTitle,  // The key you're sending to the Django view
                },
                beforeSend: function(xhr) {
                    // Add CSRF token
                    xhr.setRequestHeader('X-CSRFToken', getCSRFToken());
                },
                success: function(response) {
                    if ( response.status === "success" ) {
                        $('#id_profile').val(response.ai_profile)
                    } else {
                        alert(response.message)
                    }
                },
                error: function(xhr, status, error) {
                    console.log('Error:', error);
                }
            });
        } else {
            console.log('You must provide a job title to get data.');
        }
    });

    // ---------------------------------------------------------------------
    // Experience
    $('#add-experience').click(function(e){
        e.preventDefault();
        experienceCount++;
        let newExperience = $(`
            <div class="accordion-item">
                <h2 class="accordion-header" id="exp_head_${experienceCount}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#exp_${experienceCount}" aria-expanded="false"
                            aria-controls="collapseExp${experienceCount}">
                        Expérience #${experienceCount}
                    </button>
                </h2>
                <div id="exp_${experienceCount}" class="accordion-collapse collapse" aria-labelledby="exp_head_${experienceCount}"
                     data-bs-parent="#experience-accordion">
                    <div class="accordion-body">
                        <p class="lead border-bottom">Expérience #${experienceCount}</p>
                        <div class="row mb-3">
                            <div class="col">
                                <label class="form-label" for="exp_post_title_${experienceCount}">Poste</label>
                                <input class="form-control" id="exp_post_title_${experienceCount}"
                                       type="text"
                                       placeholder="Poste title"
                                       name="exp_post_title_${experienceCount}">
                            </div>
                            <div class="col">
                                <label class="form-label" for="exp_employee_${experienceCount}">Employée</label>
                                <input class="form-control" id="exp_employee_${experienceCount}"
                                       type="text"
                                       placeholder="Employee"
                                       name="exp_employee_${experienceCount}">
                            </div>
                        </div><!-- Poste and Employée -->

                        <div class="row mb-3">
                            <div class="col">
                                <label class="form-label" for="exp_start_date_${experienceCount}">Date de début</label>
                                <div class="d-flex justify-content-between">
                                    <input class="form-control" id="exp_start_date_${experienceCount}"
                                           type="date"
                                           name="exp_start_date_${experienceCount}">
                                    <input class="form-control" id="exp_end_date_${experienceCount}"
                                           type="date"
                                           name="exp_end_date_${experienceCount}">
                                </div>
                            </div>
                            <div class="col">
                                <label class="form-label" for="exp_ville_${experienceCount}">Ville</label>
                                <input class="form-control" id="exp_ville_${experienceCount}"
                                       type="text"
                                       placeholder="Ville"
                                       name="exp_ville_${experienceCount}">
                            </div>
                        </div><!-- Exp Date -->

                        <div class="form-group">
                            <label class="form-label" for="exp_description_${experienceCount}">Description</label>
                            <textarea class="form-control" id="exp_description_${experienceCount}"
                                      placeholder="A brief description about this job."
                                      name="exp_description_${experienceCount}"></textarea>
                        </div><!-- Exp Description -->

                        <button type="button" class="btn btn-danger remove-experience-btn mt-2">
                            <i class="bi bi-trash3"></i> Remove
                        </button>
                    </div><!-- accordion-body -->
                </div><!-- collapse -->
            </div><!-- accordion-item -->
        `);
        $("#experience-accordion").append(newExperience);
    });

    // Remove Experience Accordion
    $(document).on("click", ".remove-experience-btn", function() {
        console.log('Removing Experience Accordion Item');
        $(this).closest(".accordion-item").fadeOut(300, function() { $(this).remove(); });
    });

});
