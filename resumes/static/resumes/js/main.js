$(document).ready(function() {
    //$(".accordion-content").hide(); // Hide all sections initially

    let languageCount = 1;
    let skillCount = 1;
    let linkCount = 1;

    // Common Skills
    let commonSkills = ["Data Analysis", "Machine Learning", "Web Development", "Cybersecurity", "Cloud Computing",
        "DevOps", "Database Management", "Software Testing", "Mobile App Development", "Embedded Systems",
        "Inventory Management", "Word, Excel", "Powerpoint", "Microsoft Office", "JavaScript", "PHP", "Java",
        "SQL/NoSQL", "Teamwork "
    ];

    // Refresh Common Skills
    function refreshCommonSkills() {
        $("#common-skills").empty();
        commonSkills.slice(0, 10).forEach(skill => {
            $("#common-skills").append(`<div class="skill">${skill}&nbsp;<span>+</span></div>`);
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
            refreshCommonSkills();
        }

        $(this).fadeOut(300, function () { $(this).remove(); });
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
                    <input type="text" name="link_name_${linkCount}" placeholder="Enter link name (e.g., YouTube)" class="form-control">
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

});
