// ===== contact form settings: EmailJS (needs your own account) with mailto fallback =====
// To receive messages directly from the form, create a free account at https://www.emailjs.com,
// add an email service + a template, then paste the three values below.
// Template variables used: {{name}}, {{email}}, {{phone}}, {{message}}.
// While these are empty, the form opens the visitor's email app with the message pre-filled instead.
var EMAILJS_PUBLIC_KEY = "";   // e.g. "AbCdEfGhIjKlMnOpQ"
var EMAILJS_SERVICE_ID = "";   // e.g. "service_xxxxxxx"
var EMAILJS_TEMPLATE_ID = "";  // e.g. "template_xxxxxxx"
var CONTACT_EMAIL = "mahithamohank@gmail.com";

function openMailClient(url) {
    window.location.href = url;
}

$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    $("#contact-form").submit(function (event) {
        event.preventDefault();
        var form = document.getElementById("contact-form");

        if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && window.emailjs) {
            emailjs.init(EMAILJS_PUBLIC_KEY);
            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, '#contact-form')
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    form.reset();
                    alert("Thank you! Your message has been sent.");
                }, function (error) {
                    console.log('FAILED...', error);
                    alert("Message could not be sent. Please email me directly at " + CONTACT_EMAIL);
                });
        } else {
            var name = form.elements["name"].value;
            var email = form.elements["email"].value;
            var phone = form.elements["phone"].value;
            var message = form.elements["message"].value;
            var subject = "Portfolio enquiry from " + name;
            var body = message + "\n\n---\nName: " + name + "\nEmail: " + email + (phone ? "\nPhone: " + phone : "");
            openMailClient("mailto:" + CONTACT_EMAIL +
                "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body));
        }
    });
    // <!-- contact form end -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Mahitha Mohan";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Full-Stack Developer", "Computer Science Engineering Student", "AI Application Developer", "Data Analytics Enthusiast"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    try {
        const response = await fetch(type === "skills" ? "skills.json" : "./projects/projects.json");
        if (!response.ok) throw new Error("HTTP " + response.status);
        return await response.json();
    } catch (err) {
        // opened without a web server (file://): use the embedded copy in assets/js/data.js
        if (window.PORTFOLIO_DATA) return window.PORTFOLIO_DATA[type === "skills" ? "skills" : "projects"];
        throw err;
    }
}

function showSkills(categories) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    categories.forEach(group => {
        skillHTML += `<h3 class="skill-category">${group.category}</h3><div class="row">`;
        group.skills.forEach(skill => {
            const icon = skill.icon
                ? `<img src="${skill.icon}" alt="${skill.name}" />`
                : `<i class="${skill.fa}" aria-hidden="true"></i>`;
            skillHTML += `
        <div class="bar">
              <div class="info">
                ${icon}
                <span>${skill.name}</span>
              </div>
            </div>`;
        });
        skillHTML += `</div>`;
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).forEach(project => {
        const buttons = [];
        if (project.links && project.links.view) buttons.push(`<a href="${project.links.view}" class="btn" target="_blank" rel="noopener noreferrer"><i class="fas fa-eye"></i> View</a>`);
        if (project.links && project.links.code) buttons.push(`<a href="${project.links.code}" class="btn" target="_blank" rel="noopener noreferrer">Code <i class="fas fa-code"></i></a>`);
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="${project.name} project preview"${project.position ? ` style="object-position: ${project.position}"` : ""} />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p class="meta">${project.type} | ${project.tech}</p>
          <p>${project.desc}</p>
          ${buttons.length ? `<div class="btns">${buttons.join("")}</div>` : ""}
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .email', { interval: 1000 });
srtop.reveal('.home .phone', { interval: 1200 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CERTIFICATIONS */
srtop.reveal('.certifications .cert-card', { interval: 100 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });