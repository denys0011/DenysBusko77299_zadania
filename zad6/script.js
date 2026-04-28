// ✅ script.js - Zadanie 6
// Denys Busko 77299
// ===== ZADANIE 6: Dane z JSON =====

// Global data variable
let cvData = null;

// Load data from JSON using fetch
async function loadCVData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych: ' + response.status);
        }
        cvData = await response.json();
        renderCV();
        console.log('✅ Zadanie 6 - Dane załadowane z JSON | Denys Busko 77299');
    } catch (error) {
        console.error('❌ Błąd:', error);
        document.body.innerHTML = '<h1>Błąd ładowania danych</h1><p>Nr indeksu: 77299</p>';
    }
}

// Render all CV data
function renderCV() {
    if (!cvData) return;

    // Personal info
    if (cvData.personalInfo) {
        document.getElementById('name').textContent = `${cvData.personalInfo.name} ${cvData.personalInfo.surname}`;
        document.getElementById('index-number').textContent = cvData.personalInfo.indexNumber;
        document.getElementById('city').textContent = cvData.personalInfo.city;
        document.getElementById('postal-code').textContent = cvData.personalInfo.indexNumber;
        document.getElementById('email').textContent = cvData.personalInfo.email;
        document.getElementById('email').href = `mailto:${cvData.personalInfo.email}`;
        document.getElementById('phone').textContent = cvData.personalInfo.phone;
        document.getElementById('phone').href = `tel:${cvData.personalInfo.phone.replace(/\s/g, '')}`;
    }

    // Skills (dynamic list 1)
    if (cvData.skills) {
        const skillsList = document.getElementById('skills-list');
        skillsList.innerHTML = '';
        cvData.skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsList.appendChild(li);
        });
    }

    // Projects (dynamic list 2)
    if (cvData.projects) {
        const projectsList = document.getElementById('projects-list');
        projectsList.innerHTML = '';
        cvData.projects.forEach(project => {
            const article = document.createElement('article');
            const h3 = document.createElement('h3');
            h3.textContent = project.title;
            const p = document.createElement('p');
            p.textContent = project.description;
            article.appendChild(h3);
            article.appendChild(p);
            projectsList.appendChild(article);
        });
    }

    // Experience
    if (cvData.experience) {
        const experienceList = document.getElementById('experience-list');
        experienceList.innerHTML = '';
        cvData.experience.forEach(exp => {
            const article = document.createElement('article');
            const h3 = document.createElement('h3');
            h3.textContent = exp.position;
            const p1 = document.createElement('p');
            p1.innerHTML = `<strong>${exp.location}</strong> | ${exp.period}`;
            const p2 = document.createElement('p');
            p2.textContent = exp.description;
            article.appendChild(h3);
            article.appendChild(p1);
            article.appendChild(p2);
            experienceList.appendChild(article);
        });
    }
}

// ===== ZADANIE 4: Interakcja (zachowane) =====
function changeTheme(theme) {
    const link = document.querySelector('link[rel="stylesheet"]');
    if (link) {
        link.href = theme === 'red' ? 'red.css' : 'green.css';
    }
}

function toggleSection() {
    const section = document.getElementById('projekty-section');
    const btn = document.getElementById('toggle-projects-btn');
    if (section && btn) {
        if (section.style.display === 'none') {
            section.style.display = 'block';
            btn.textContent = '🙈 Ukryj Projekty';
        } else {
            section.style.display = 'none';
            btn.textContent = '👁️ Pokaż Projekty';
        }
    }
}

// ===== ZADANIE 5: Walidacja formularza (zachowane) =====
function isOnlyLetters(str) {
    return /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-']+$/.test(str.trim());
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(inputId + '-error');
    if (input) input.classList.add('error');
    if (errorSpan) errorSpan.textContent = message;
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(inputId + '-error');
    if (input) input.classList.remove('error');
    if (errorSpan) errorSpan.textContent = '';
}

function validateForm(e) {
    e.preventDefault();
    let isValid = true;

    ['firstName', 'lastName', 'email-form', 'message'].forEach(clearError);

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email-form').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!firstName) {
        showError('firstName', 'Imię jest wymagane');
        isValid = false;
    } else if (!isOnlyLetters(firstName)) {
        showError('firstName', 'Imię nie może zawierać cyfr');
        isValid = false;
    }

    if (!lastName) {
        showError('lastName', 'Nazwisko jest wymagane');
        isValid = false;
    } else if (!isOnlyLetters(lastName)) {
        showError('lastName', 'Nazwisko nie może zawierać cyfr');
        isValid = false;
    }

    if (!email) {
        showError('email-form', 'E-mail jest wymagany');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email-form', 'Niepoprawny format e-mail');
        isValid = false;
    }

    if (!message) {
        showError('message', 'Wiadomość jest wymagana');
        isValid = false;
    }

    if (isValid) {
        const successMsg = document.getElementById('success-message');
        if (successMsg) {
            successMsg.classList.add('show');
            setTimeout(() => successMsg.classList.remove('show'), 3000);
        }
        document.getElementById('contact-form').reset();
        console.log('✅ Formularz poprawny - Denys Busko 77299');
    }
    return isValid;
}

// ===== Inicjalizacja =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Zadanie 6 - JavaScript załadowany | Denys Busko 77299');
    
    // Load data from JSON
    loadCVData();

    // Theme buttons
    const themeRedBtn = document.getElementById('theme-red-btn');
    const themeGreenBtn = document.getElementById('theme-green-btn');
    if (themeRedBtn) themeRedBtn.addEventListener('click', () => changeTheme('red'));
    if (themeGreenBtn) themeGreenBtn.addEventListener('click', () => changeTheme('green'));

    // Toggle button
    const toggleBtn = document.getElementById('toggle-projects-btn');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleSection);

    // Form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
        ['firstName', 'lastName', 'email-form', 'message'].forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', () => clearError(fieldId));
            }
        });
    }
});