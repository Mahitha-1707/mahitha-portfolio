# Mahitha Mohan - Portfolio

I’m K. Mahitha Mohan, a final-year B.Tech CSE student passionate about full-stack development, AI applications, data analytics, and ServiceNow. I enjoy building innovative, user-friendly solutions and continuously improving my technical skills. I’m seeking opportunities to learn, contribute, and grow as a software professional.

Personal portfolio of **Kizhiyathodi Mahitha Mohan**, final-year B.Tech Computer Science and Engineering student.
Built with HTML5, CSS3, JavaScript and jQuery (no build step).

## Run locally
Simplest: double-click `index.html`. (Skills and projects then come from the embedded copy in `assets/js/data.js`.)

Recommended while editing: use a local server, which reads `skills.json` and `projects/projects.json` directly:

```
python -m http.server 8000
```
then visit http://localhost:8000  (use `python3` on Mac/Linux). If you edit the JSON files and open the site by double-click, also update `assets/js/data.js`.

It can be hosted on any static host (GitHub Pages, Netlify, Vercel...). All internal paths are relative.

## Where to edit things
| What | File |
|---|---|
| Hero, About, Education, Experience, Certifications, Contact, Footer | `index.html` |
| Skill categories | `skills.json` |
| Projects (add `"links": {"view": "...", "code": "..."}` to show buttons) | `projects/projects.json` |
| Profile photo | `assets/images/mahitha-profile.jpg` |
| Resume | `assets/resume/Mahitha_Mohan_Resume.pdf` |
| Project card images (replace with real screenshots, same filenames, `.png`) | `assets/images/projects/` |
| Contact form (EmailJS keys) | top of `assets/js/script.js` |

## Contact form
Until EmailJS is configured, the form opens the visitor's email app with the message pre-filled.
To receive messages directly: create a free account at https://www.emailjs.com, add an email service and a template using the variables `{{name}}`, `{{email}}`, `{{phone}}`, `{{message}}`, then paste the public key, service ID and template ID into `assets/js/script.js`.

## Credits
Layout and styling are based on the open-source template by Jigar Sable: https://github.com/jigar-sable/Portfolio-Website
Libraries: Particles.js, Typed.js, Vanilla-Tilt, ScrollReveal, Isotope, Font Awesome, EmailJS.
