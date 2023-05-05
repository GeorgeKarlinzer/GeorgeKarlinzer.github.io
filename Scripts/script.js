function showSkills() {
    document.getElementsByName("hiddable-skill")
        .forEach(x => {
            x.classList.remove("hidden");
        });

    var btn = document.getElementById("show-skills-btn");
    btn.textContent = "Hide";
    btn.onclick = hideSkills;
}

function hideSkills() {
    document.getElementsByName("hiddable-skill")
        .forEach(x => {
            x.classList.add("hidden")
        })

    var btn = document.getElementById("show-skills-btn");
    btn.textContent = "Show all";
    btn.onclick = showSkills;
}

function addHr(element) {
    var hr = document.createElement('hr');
    element.appendChild(hr);
}

function generateSkill(skill, template, section, isLast) {
    var skillEl = template.content.cloneNode(true).querySelector('div');
    var fullStarClasses = 'fa fa-solid fa-star';
    var emptyStartClasses = 'fa fa-regular fa-star';

    // Set hiddability if skill is not primary
    if (!skill.isPrimary) {
        skillEl.className = 'hidden';
        skillEl.setAttribute('name', 'hiddable-skill');
    }

    // Set skill icon and name
    var skillNameEl = skillEl.querySelector('p');
    var skillNameIconEl = skillNameEl.querySelector('i');
    skillNameIconEl.className = 'fa ' + skill.icon;
    skillNameEl.innerHTML += skill.name;

    // Set stars according to skill level
    var starsEl = skillEl.querySelectorAll('div > i');
    for (var i = 1; i <= 5; i++) {
        starsEl[i - 1].className = i <= skill.skillLevel ? fullStarClasses : emptyStartClasses;
    }

    if (!isLast) addHr(skillEl);
    section.appendChild(skillEl);
}

function generateProject(project, template, section, isLast) {
    var projectEl = template.content.cloneNode(true).querySelector('div');

    // Set name
    var nameEl = projectEl.querySelector('h3 a');
    nameEl.setAttribute('href', project.link);
    nameEl.innerHTML = project.name;

    // Set technologies
    var technologiesEl = projectEl.querySelector('h4');
    technologiesEl.innerHTML = project.technologies.join(', ');

    // Set description
    var descriptionEl = projectEl.querySelector('p');
    descriptionEl.innerHTML = replaceES(project.description);

    if (!isLast) addHr(projectEl);
    section.appendChild(projectEl);
}

function generateEducation(education, template, section, isLast) {
    var educationEl = template.content.cloneNode(true).querySelector('div');

    // Set education title
    var titleEl = educationEl.querySelector('h3');
    titleEl.innerHTML = education.title;

    // Set dates
    var datesEl = educationEl.querySelector('h4');
    datesEl.innerHTML += `${education.startDate} - ${education.finishDate}`;
    if (education.isCurrent) {
        var span = document.createElement('span');

        span.setAttribute('class', 'cv-text-filled');
        span.innerHTML = 'Current';

        datesEl.appendChild(span);
    }

    // Set description
    var descriptionEl = educationEl.querySelector('p');
    descriptionEl.innerHTML = replaceES(education.description);

    if (!isLast) addHr(educationEl);
    section.appendChild(educationEl);
}

function generateJob(job, template, section, isLast) {
    var jobEl = template.content.cloneNode(true).querySelector('div');

    // Set job title
    var titleEl = jobEl.querySelector('h3');
    titleEl.innerHTML = job.title;

    // Set dates
    var datesEl = jobEl.querySelector('h4');
    datesEl.innerHTML += `${job.startDate} - ${job.finishDate}`;
    if (job.isCurrent) {
        var span = document.createElement('span');

        span.setAttribute('class', 'cv-text-filled');
        span.innerHTML = 'Current';

        datesEl.appendChild(span);
    }

    // Set description
    var descriptionEl = jobEl.querySelector('p');
    descriptionEl.innerHTML = replaceES(job.description);

    if (!isLast) addHr(jobEl);
    section.appendChild(jobEl);
}

function replaceES(str){
    str = str.replaceAll('\n', '<br>');
    str = str.replaceAll('\t', '&emsp;&emsp;');
    return str;
}


var dynamicElements = [
    {
        link: 'http://localhost:8080/Data/skills.json',
        sectionId: 'skills-section',
        templateId: 'skill-template',
        function: generateSkill
    },
    {
        link: 'http://localhost:8080/Data/projects.json',
        sectionId: 'projects-section',
        templateId: 'project-template',
        function: generateProject
    },
    {
        link: 'http://localhost:8080/Data/educations.json',
        sectionId: 'educations-section',
        templateId: 'education-template',
        function: generateEducation
    },
    {
        link: 'http://localhost:8080/Data/jobs.json',
        sectionId: 'jobs-section',
        templateId: 'job-template',
        function: generateJob
    }
];

dynamicElements.forEach(element => {
    fetch(element.link)
        .then(response => response.json())
        .then(items => {
            var section = document.getElementById(element.sectionId);
            var template = document.getElementById(element.templateId);

            items.forEach(item => {
                element.function(item, template, section, items.at(-1) == item);
            });
        })
});