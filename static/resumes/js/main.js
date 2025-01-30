$(document).ready(function() {
    let languageCount = 1;
    let skillCount = 1;
    let linkCount = 1;
    let commonSkills = ["Data Analysis", "Machine Learning", "Web Development", "Cybersecurity", "Cloud Computing",
        "DevOps", "Database Management", "Software Testing", "Mobile App Development", "Embedded Systems",
        "Inventory Management", "Word, Excel", "Powerpoint", "Microsoft Office", "JavaScript", "PHP", "Java",
        "SQL/NoSQL", "Teamwork "
    ];

    function refreshCommonSkills() {
        $("#common-skills").empty();
        commonSkills.slice(0, 10).forEach(skill => {
            $("#common-skills").append(`<div class="skill">${skill}&nbsp;<span>+</span></div>`);
        });
    }
    refreshCommonSkills();

    $("#add-language-btn").click(function() {
        let newLanguageRow = $(`
            <div class="form-group fade-in">
                <div class="form-group-input">
                    <input type="text" name="languages_${languageCount}" placeholder="Enter a language" class="form-control">
                </div>
                <div class="form-group-input">
                    <select name="proficiency_${languageCount}" class="form-control">
                        <option value="1">Beginner</option>
                        <option value="2">Intermediate</option>
                        <option value="3">Fluent</option>
                        <option value="4">Maternal</option>
                    </select>
                    <button type="button" class="btn remove-btn language-remove-btn">Remove</button>
                </div>
            </div>
        `);
        $("#languages-container").append(newLanguageRow);
        languageCount++;
    });

    $("#add-skill-btn").click(function() {
        let newSkillRow = $(`
            <div class="form-group fade-in">
                <div class="form-group-input">
                    <input type="text" name="skills_${skillCount}" placeholder="Enter a skill" class="form-control">
                </div>
                <div class="form-group-input">
                    <select name="niveau_${skillCount}" class="form-control">
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                    <button type="button" class="btn remove-btn skill-remove-btn">Remove</button>
                </div>
            </div>
        `);
        $("#skills-container").append(newSkillRow);
        skillCount++;
    });

    $(document).on("click", ".remove-btn", function() {
        $(this).closest(".form-group").fadeOut(300, function() { $(this).remove(); });
    });

    $("#common-skills").on("click", ".skill", function() {
        let selectedSkill = $(this).text().trim().replace("+", "").trim();
        let skillInputs = $('#skills-container input[name^="skills_"]');
        let added = false;

        skillInputs.each(function() {
            if (!$(this).val() && !added) {
                $(this).val(selectedSkill);
                added = true;
            }
        });

        if (!added) {
            let newSkillRow = $(`
                <div class="form-group fade-in">
                    <div class="form-group-input">
                        <input type="text" name="skills_${skillCount}" value="${selectedSkill}" placeholder="Enter a skill" class="form-control">
                    </div>
                    <div class="form-group-input">
                        <select name="niveau_${skillCount}" class="form-control">
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                        <button type="button" class="btn remove-btn skill-remove-btn">Remove</button>
                    </div>
                </div>
            `);
            $("#skills-container").append(newSkillRow);
            skillCount++;
        }
        commonSkills = commonSkills.filter(skill => skill !== selectedSkill);
        refreshCommonSkills();
    });

    $("#add-link-btn").click(function() {
        let newLinkRow = $(`
            <div class="form-group fade-in">
                <div class="form-group-input">
                    <input type="text" name="link_name_${linkCount}" placeholder="Enter link name (e.g., YouTube)" class="form-control">
                </div>
                <div class="form-group-input">
                    <input type="url" name="link_url_${linkCount}" placeholder="Enter link URL" class="form-control">
                    <button type="button" class="btn remove-btn">Remove</button>
                </div>
            </div>
        `);
        $("#links-container").append(newLinkRow);
        linkCount++;
    });
});
