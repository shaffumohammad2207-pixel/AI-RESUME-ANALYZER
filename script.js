/* =========================================
   AI RESUME BUILDER
   Main JavaScript File
========================================= */


/* =========================================
   1. GENERATE CAREER OBJECTIVE
========================================= */

function generateObjective() {

    const name =
        document.getElementById("fullName")?.value || "";

    const job =
        document.getElementById("jobTitle")?.value ||
        "Software Developer";

    const type =
        document.getElementById("profileType")?.value ||
        "Student";

    const skills =
        document.getElementById("skills")?.value ||
        "programming and web development";


    let objective = "";


    if (type === "Student") {

        objective =
            `Motivated student aspiring to build a career as a ${job}. ` +
            `Passionate about developing practical solutions using ` +
            `${skills}. Seeking opportunities to apply technical ` +
            `knowledge, learn from experienced professionals and ` +
            `contribute to meaningful projects.`;

    }

    else if (type === "Fresher") {

        objective =
            `Enthusiastic and career-focused ${job} with a strong ` +
            `foundation in ${skills}. Looking for an opportunity to ` +
            `apply technical skills, develop real-world solutions ` +
            `and grow as a professional while contributing to the ` +
            `success of the organization.`;

    }

    else {

        objective =
            `Results-oriented professional specializing in ${job}, ` +
            `with experience working with ${skills}. Seeking an ` +
            `opportunity to apply technical expertise, solve ` +
            `real-world problems and contribute to organizational growth.`;

    }


    const objectiveBox =
        document.getElementById("objective");


    if (objectiveBox) {

        objectiveBox.value = objective;

    }

}


/* =========================================
   2. SAVE FORM DATA
========================================= */

const resumeForm =
    document.getElementById("resumeForm");


if (resumeForm) {

    resumeForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const resumeData = {

                fullName:
                    getValue("fullName"),

                jobTitle:
                    getValue("jobTitle"),

                email:
                    getValue("email"),

                phone:
                    getValue("phone"),

                location:
                    getValue("location"),

                profileType:
                    getValue("profileType"),

                objective:
                    getValue("objective"),

                degree:
                    getValue("degree"),

                college:
                    getValue("college"),

                graduation:
                    getValue("graduation"),

                cgpa:
                    getValue("cgpa"),

                skills:
                    getValue("skills"),

                projectName:
                    getValue("projectName"),

                projectTech:
                    getValue("projectTech"),

                projectDescription:
                    getValue("projectDescription"),

                company:
                    getValue("company"),

                role:
                    getValue("role"),

                experience:
                    getValue("experience"),

                certifications:
                    getValue("certifications"),

                linkedin:
                    getValue("linkedin"),

                github:
                    getValue("github"),

                portfolio:
                    getValue("portfolio")

            };


            localStorage.setItem(
                "resumeData",
                JSON.stringify(resumeData)
            );


            window.location.href =
                "templates.html";

        }
    );

}


/* =========================================
   3. GET INPUT VALUE
========================================= */

function getValue(id) {

    const element =
        document.getElementById(id);

    return element
        ? element.value.trim()
        : "";

}


/* =========================================
   4. TEMPLATE SELECTION
========================================= */

const templateButtons =
    document.querySelectorAll(
        ".select-template"
    );


templateButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                const template =
                    button.dataset.template;


                localStorage.setItem(
                    "selectedTemplate",
                    template
                );


                window.location.href =
                    "resume.html";

            }
        );

    }
);


/* =========================================
   5. LOAD SAVED DATA BACK INTO FORM
========================================= */

function loadFormData() {

    const savedData =
        localStorage.getItem("resumeData");


    if (!savedData) {
        return;
    }


    const data =
        JSON.parse(savedData);


    Object.keys(data).forEach(
        function(key) {

            const element =
                document.getElementById(key);


            if (element) {

                element.value =
                    data[key];

            }

        }
    );

}


loadFormData();


/* =========================================
   6. GENERATE RESUME
========================================= */

function generateResume() {

    const output =
        document.getElementById("resumeOutput");


    if (!output) {
        return;
    }


    const savedData =
        localStorage.getItem("resumeData");


    if (!savedData) {

        output.innerHTML = `
            <div style="text-align:center;">
                <h2>No Resume Data Found</h2>
                <p>Please enter your details first.</p>
                <br>
                <a href="index.html" class="primary-btn">
                    Enter Details
                </a>
            </div>
        `;

        return;

    }


    const data =
        JSON.parse(savedData);


    const template =
        localStorage.getItem(
            "selectedTemplate"
        ) || "classic";


    output.className =
        "resume-paper resume-" + template;


    if (template === "modern") {

        output.innerHTML =
            createModernResume(data);

    }

    else if (template === "minimal") {

        output.innerHTML =
            createMinimalResume(data);

    }

    else {

        output.innerHTML =
            createClassicResume(data);

    }

}


/* =========================================
   7. CLASSIC RESUME
========================================= */

function createClassicResume(data) {

    return `

        <div class="resume-classic">

            <header class="resume-header">

                <div class="resume-name">
                    ${safe(data.fullName)}
                </div>

                <div class="resume-title">
                    ${safe(data.jobTitle)}
                </div>

                <div class="contact-info">

                    ${safe(data.email)}

                    ${data.phone ? " | " + safe(data.phone) : ""}

                    ${data.location ? " | " + safe(data.location) : ""}

                </div>

            </header>


            ${objectiveSection(data)}

            ${educationSection(data)}

            ${skillsSection(data)}

            ${projectSection(data)}

            ${experienceSection(data)}

            ${certificationSection(data)}

            ${linksSection(data)}

        </div>

    `;

}


/* =========================================
   8. MODERN RESUME
========================================= */

function createModernResume(data) {

    return `

        <div class="resume-modern">

            <aside class="resume-side">

                <div class="resume-name">
                    ${safe(data.fullName)}
                </div>

                <div class="resume-title">
                    ${safe(data.jobTitle)}
                </div>


                <div class="contact-info">

                    <p>${safe(data.email)}</p>

                    <p>${safe(data.phone)}</p>

                    <p>${safe(data.location)}</p>

                </div>


                ${skillsSection(data)}

                ${educationSection(data)}

                ${linksSection(data)}

            </aside>


            <div class="resume-main">

                ${objectiveSection(data)}

                ${projectSection(data)}

                ${experienceSection(data)}

                ${certificationSection(data)}

            </div>

        </div>

    `;

}


/* =========================================
   9. MINIMAL RESUME
========================================= */

function createMinimalResume(data) {

    return `

        <div class="resume-minimal">

            <header class="resume-header">

                <div class="resume-name">
                    ${safe(data.fullName)}
                </div>

                <div class="resume-title">
                    ${safe(data.jobTitle)}
                </div>

                <div class="contact-info">

                    ${safe(data.email)}
                    |
                    ${safe(data.phone)}
                    |
                    ${safe(data.location)}

                </div>

            </header>


            ${objectiveSection(data)}

            ${skillsSection(data)}

            ${educationSection(data)}

            ${experienceSection(data)}

            ${projectSection(data)}

            ${certificationSection(data)}

            ${linksSection(data)}

        </div>

    `;

}


/* =========================================
   10. OBJECTIVE
========================================= */

function objectiveSection(data) {

    if (!data.objective) {
        return "";
    }


    return `

        <section class="resume-section">

            <h3>
                Profile
            </h3>

            <p>
                ${safe(data.objective)}
            </p>

        </section>

    `;

}


/* =========================================
   11. EDUCATION
========================================= */

function educationSection(data) {

    if (
        !data.degree &&
        !data.college
    ) {

        return "";

    }


    return `

        <section class="resume-section">

            <h3>
                Education
            </h3>

            <p>

                <strong>
                    ${safe(data.degree)}
                </strong>

                ${data.college
                    ? " — " + safe(data.college)
                    : ""
                }

                ${data.graduation
                    ? " | " + safe(data.graduation)
                    : ""
                }

                ${data.cgpa
                    ? " | " + safe(data.cgpa)
                    : ""
                }

            </p>

        </section>

    `;

}


/* =========================================
   12. SKILLS
========================================= */

function skillsSection(data) {

    if (!data.skills) {
        return "";
    }


    const skills =
        data.skills
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill !== "");


    const skillHTML =
        skills
            .map(
                skill =>
                    `<span class="skill-tag">
                        ${safe(skill)}
                    </span>`
            )
            .join("");


    return `

        <section class="resume-section">

            <h3>
                Skills
            </h3>

            <div class="skills-list">

                ${skillHTML}

            </div>

        </section>

    `;

}


/* =========================================
   13. PROJECT
========================================= */

function projectSection(data) {

    if (
        !data.projectName &&
        !data.projectDescription
    ) {

        return "";

    }


    return `

        <section class="resume-section">

            <h3>
                Projects
            </h3>

            <div>

                <div class="project-title">

                    ${safe(data.projectName)}

                </div>

                <div class="project-tech">

                    ${safe(data.projectTech)}

                </div>

                <p>

                    ${safe(data.projectDescription)}

                </p>

            </div>

        </section>

    `;

}


/* =========================================
   14. EXPERIENCE
========================================= */

function experienceSection(data) {

    if (
        !data.company &&
        !data.experience
    ) {

        return "";

    }


    return `

        <section class="resume-section">

            <h3>
                Experience
            </h3>

            <p>

                <strong>
                    ${safe(data.role)}
                </strong>

                ${data.company
                    ? " — " + safe(data.company)
                    : ""
                }

            </p>

            <p>

                ${safe(data.experience)}

            </p>

        </section>

    `;

}


/* =========================================
   15. CERTIFICATIONS
========================================= */

function certificationSection(data) {

    if (!data.certifications) {
        return "";
    }


    const certificates =
        data.certifications
            .split(",")
            .map(item => item.trim())
            .filter(item => item !== "");


    return `

        <section class="resume-section">

            <h3>
                Certifications
            </h3>

            <p>

                ${certificates
                    .map(cert => safe(cert))
                    .join(" • ")
                }

            </p>

        </section>

    `;

}


/* =========================================
   16. LINKS
========================================= */

function linksSection(data) {

    if (
        !data.linkedin &&
        !data.github &&
        !data.portfolio
    ) {

        return "";

    }


    return `

        <section class="resume-section">

            <h3>
                Links
            </h3>

            <p>

                ${data.linkedin
                    ? "LinkedIn: " + safe(data.linkedin)
                    : ""
                }

                ${data.github
                    ? " | GitHub: " + safe(data.github)
                    : ""
                }

                ${data.portfolio
                    ? " | Portfolio: " + safe(data.portfolio)
                    : ""
                }

            </p>

        </section>

    `;

}


/* =========================================
   17. BASIC HTML SAFETY
========================================= */

function safe(value) {

    if (!value) {
        return "";
    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================
   18. RUN RESUME GENERATION
========================================= */

generateResume();