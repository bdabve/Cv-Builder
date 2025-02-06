$(document).ready(function() {
    //$(".accordion-content").hide(); // Hide all sections initially
    // Enabling ToolTip
    $('[data-bs-toggle="tooltip"]').tooltip();

    let languageCount = 1;
    let skillCount = 1;
    let linkCount = 1;
    let experienceCount = 1;
    let educationCount = 1;

    // Common Skills
    let commonSkills = [];

    // Function to get the CSRF token from the cookie
    function getCSRFToken() {
        var name = 'csrftoken=';
        var value = document.cookie.split(';').find(row => row.trim().startsWith(name));
        return value ? value.split('=')[1] : null;
    }

    // Remove { Language, Skill } Row work with ClassName: '.remove-btn'
    $(document).on("click", ".remove-btn", function() {
        $(this).closest(".content-div").fadeOut(300, function() { $(this).remove(); });
    });

    // Remove {  Education, Experience } Accordion
    $(document).on("click", ".remove-accordion-item", function() {
        /*
        let btn_id = $(this).attr('id')
        if ( btn_id == 'remove-accordion-exp' ) {
            console.log('decrement expcount')
            experienceCount -= 1
            console.log(experienceCount)
        } else if ( btn_id == 'remove-accordion-edu' ) {
            console.log('decrement edu')
            educationCount -= 1
            console.log(educationCount)
        }
        */
        $(this).closest(".accordion-item").fadeOut(300, function() { $(this).remove(); });
    });


    // AI Generate Profile
    $("#ai-profile").on("click", function(e) {
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
            $('#id_poste').focus();
        }
    });

    // ---------------------------------------------------------------------
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
                    <button type="button" class="remove-btn btn btn-outline-danger ms-1">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
        `);
        $("#skills-container").append(newSkillRow);
        skillCount++;
    }

    // Refresh Common Skills
    function refreshCommonSkills() {
        $("#common-skills").empty();
        commonSkills.slice(0, 10).forEach(skill => {
            $("#common-skills").append(`<div class="skill">${skill}&nbsp;<i class="bi bi-plus"></i></div>`);
        });
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
        }

        $(this).fadeOut(300, function () { $(this).remove(); });
        console.log(commonSkills)
    });

    // AI
    $("#ai-poste-skills").on("click", function(e) {
        e.preventDefault();
        let jobTitle = $('#id_poste').val();
        if (jobTitle.length > 2) {
            $.ajax({
                url: '/resumes/ai-skills/',  // The URL of your Django view
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
                        commonSkills = skills
                        $.each(skills, function(index, skill) {
                            $("#common-skills").append(`<div class="skill">${skill}&nbsp;<i class="bi bi-plus"></i></div>`);
                        });
                    } else {
                        alert('Error getting skills', response.message);
                    }
                },
                error: function(xhr, status, error) {
                    console.log('Status', status, 'Error:', error);
                }
            });
        } else {
            $('#id_poste').focus()
        }
    });

    // ---------------------------------------------------------------------
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
                    <button type="button" class="remove-btn btn btn-outline-danger ms-2">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
        `);
        $("#languages-container").append(newLanguageRow);
        languageCount++;
    });

    // ---------------------------------------------------------------------
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
                    <button type="button" class="remove-btn btn btn-outline-danger ms-2">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
        `);
        $("#links-container").append(newLinkRow);
        linkCount++;
    });

    // ---------------------------------------------------------------------
    // Add Experience
    $('#add-experience').click(function(e){
        e.preventDefault();
        if (experienceCount == 1) {
            $('#experience-accordion').show()
        } else {
            let newExperience = $(`
                <div class="accordion-item">
                    <h2 class="accordion-header" id="exp_head_${experienceCount}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#exp_${experienceCount}" aria-expanded="false"
                                aria-controls="collapseExp${experienceCount}">
                            Expérience #${experienceCount + 1}
                        </button>
                    </h2>
                    <div id="exp_${experienceCount}"
                         class="accordion-collapse collapse" aria-labelledby="exp_head_${experienceCount}"
                         data-bs-parent="#experience-accordion">
                        <div class="accordion-body">

                            <div class="row mb-3 border-bottom border-3 border-secondary">
                                <div class="col">
                                    <p class="lead">Expérience #${experienceCount + 1}</p>
                                </div>
                                <div class="col">
                                    <div class="col">
                                        <button id="remove-accordion-exp" type="button"
                                                class="remove-accordion-item btn btn-sm btn-outline-danger float-end">
                                            <i class="bi bi-trash3"></i>
                                        </button>
                                    </div>
                                </div>
                            </div><!-- end of remove button row -->

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

                            <div class="row mb-3">
                                <div class="col">
                                    <div class="d-flex justify-content-between">
                                        <label class="form-label" for="exp_description_${experienceCount}">Description</label>
                                        <div class="form-check">
                                            <input class="form-check-input" id="exp_desc_aslist_${experienceCount}"
                                                   type="checkbox"
                                                   name="exp_desc_aslist_${experienceCount}"
                                                   value="1">
                                            <label class="form-check-label" for="exp_desc_aslist_${experienceCount}">
                                                Display as a list
                                            </label>
                                        </div>
                                    </div>
                                    <textarea class="form-control" id="exp_description_${experienceCount}"
                                              name="exp_description_${experienceCount}" rows="6"
                                              placeholder="Enter Description for this post"></textarea>
                                </div>
                            </div><!-- Exp Description -->

                        </div><!-- accordion-body -->
                    </div><!-- collapse -->
                </div><!-- accordion-item -->
            `);
            $("#experience-accordion").append(newExperience);
        }
        experienceCount++;
    });

    // ---------------------------------------------------------------------
    //
    $(document).on("click", ".ai-edu-desc", function(e) {
        e.preventDefault();
        let diploma = $(this).closest(".row").prev().prev().find(".diploma").val();
        let desc_textarea = $(this).closest(".row").find("textarea");

        console.log(diploma)
        if (!diploma) {
                alert("Please enter a diploma before generating a description.");
                return;
            }

        if (diploma.length > 2) {
            $.ajax({
                url: '/resumes/ai-edu-desc/',  // The URL of your Django view
                method: 'POST',
                data: {
                    diploma: diploma,  // The key you're sending to the Django view
                    //csrfmiddlewaretoken: '{{ csrf_token }}',  // CSRF token for security
                },
                beforeSend: function(xhr) {
                    // Add CSRF token
                    xhr.setRequestHeader('X-CSRFToken', getCSRFToken());
                },
                success: function(response) {
                    if ( response.status == 'success' ) {
                        console.log(response)
                        desc_textarea.val(response.ai_edu_desc)
                    } else {
                        alert('Error getting description for education', response.message);
                    }
                },
                error: function(xhr, status, error) {
                    console.log('[-] Error', error)
                }
            });
        } else {
            $('#id_poste').focus()
        }
    });
    // Add Education
    $('#add-education').click(function(e){
        e.preventDefault();
        if (educationCount == 1) {
            $('#education-accordion').show()
        } else {
            let newEducation = $(`
                <div class="accordion-item">
                    <h2 class="accordion-header" id="edu_head_${educationCount}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#edu_${educationCount}" aria-expanded="true"
                                aria-controles="#edu_${educationCount}">

                            Education #${educationCount + 1}
                        </button>
                    </h2>
                    <div id="edu_${educationCount}" class="accordion-collapse collapse"
                         aria-labeledby="edu_head_${educationCount}" data-bs-parent="#education-accordion">
                        <div class="accordion-body">

                            <div class="row mb-3 border-bottom border-3 border-secondary">
                                <div class="col">
                                    <p class="lead">Education #${educationCount + 1}</p>
                                </div>
                                <div class="col">
                                    <button id="remove-accordion-edu" type="button"
                                            class="remove-accordion-item btn btn-sm btn-outline-danger float-end">
                                        <i class="bi bi-trash3"></i>
                                    </button>
                                </div>
                            </div><!-- remove button row -->

                            <div class="row mb-3">
                                <div class="col">
                                    <label class="form-label" for="edu_ecole_${educationCount}">
                                        Ecole
                                    </label>
                                    <input class="form-control" id="edu_ecole_${educationCount}"
                                           type="text"
                                           name="edu_ecole_${educationCount}"
                                           placeholder="Ecole">
                                </div>
                                <div class="col">
                                    <label class="form-label" for="edu_diplome_${educationCount}">Diplôme</label>
                                    <input class="form-control diploma" id="edu_diplome_${educationCount}"
                                           type="text"
                                           name="edu_diplome_${educationCount}"
                                           placeholder="Diplôme">
                                </div>
                            </div><!-- edu Ecole & Diploma -->

                            <div class="row mb-3">
                                <div class="col">
                                    <label class="form-label" for="edu_start_date_${educationCount}">Date de début</label>
                                    <div class="d-flex justify-content-between">
                                        <input class="form-control" id="edu_start_date_${educationCount}"
                                               type="date"
                                               name="edu_start_date_${educationCount}">
                                        <input class="form-control" id="edu_end_date_${educationCount}"
                                               type="date"
                                               name="edu_end_date_${educationCount}">
                                    </div>
                                </div>
                                <div class="col">
                                    <label class="form-label" for="edu_ville_${educationCount}">Ville</label>
                                    <input class="form-control" id="edu_ville_${educationCount}"
                                           type="text"
                                           name="edu_ville_${educationCount}"
                                           placeholder="Ville">
                                </div>
                            </div><!-- edu Date & Ville -->

                            <div class="row mb-3">
                                <div class="col">
                                    <div class="d-flex align-items-center justify-content-between mb-3 border-top pt-2">
                                        <label class="form-label" for="edu_description_${educationCount}">Description</label>
                                        <div class="form-check">
                                            <input class="form-check-input" id="edu_desc_aslist_${educationCount}"
                                                   type="checkbox"
                                                   name="edu_desc_aslist_${educationCount}"
                                                   value="1">
                                            <label class="form-check-label" for="edu_desc_aslist_${educationCount}">
                                                Display as a list
                                            </label>
                                        </div>

                                        <button class="btn btn-sm btn-info ai-edu-desc">
                                            <i class="bi bi-robot"></i> AI Generate Description
                                        </button>
                                    </div>
                                    <textarea class="form-control" id="edu_description_${educationCount}"
                                              name="edu_description_${educationCount}" rows="6"
                                              placeholder="e.g Mention Trés bien."></textarea>
                                </div>
                            </div><!-- Exp Description -->

                        </div><!-- accordion-body -->
                    </div><!-- edu_2 collapse -->
                </div><!-- accordion-item -->
            `);
            $("#education-accordion").append(newEducation);
        }
        educationCount++;
    });

});
