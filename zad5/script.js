// ✅ script.js - Zadania 4 i 5
// Denys Busko 77299

// ===== ZADANIE 4: Interakcja =====
// 1. Переключение темы
function changeTheme(theme) {
  const link = document.querySelector('link[rel="stylesheet"]');
  if (link) {
    link.href = theme === 'red' ? 'red.css' : 'green.css';
  }
}

// 2. Скрыть/показать секцию "Projekty"
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

// ===== ZADANIE 5: Walidacja formularza =====
// Проверка: только буквы (без цифр)
function isOnlyLetters(str) {
  return /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s\-']+$/.test(str.trim());
}

// Проверка email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Показать ошибку
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const errorSpan = document.getElementById(inputId + '-error');
  if (input) input.classList.add('error');
  if (errorSpan) errorSpan.textContent = message;
}

// Скрыть ошибку
function clearError(inputId) {
  const input = document.getElementById(inputId);
  const errorSpan = document.getElementById(inputId + '-error');
  if (input) input.classList.remove('error');
  if (errorSpan) errorSpan.textContent = '';
}

// Валидация формы
function validateForm(e) {
  e.preventDefault();
  
  let isValid = true;
  
  // Очистка старых ошибок
  ['firstName', 'lastName', 'email', 'message'].forEach(clearError);
  
  // Получение значений
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  // Валидация имени
  if (!firstName) {
    showError('firstName', 'Imię jest wymagane');
    isValid = false;
  } else if (!isOnlyLetters(firstName)) {
    showError('firstName', 'Imię nie może zawierać cyfr');
    isValid = false;
  }
  
  // Валидация фамилии
  if (!lastName) {
    showError('lastName', 'Nazwisko jest wymagane');
    isValid = false;
  } else if (!isOnlyLetters(lastName)) {
    showError('lastName', 'Nazwisko nie może zawierać cyfr');
    isValid = false;
  }
  
  // Валидация email
  if (!email) {
    showError('email', 'E-mail jest wymagany');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError('email', 'Niepoprawny format e-mail');
    isValid = false;
  }
  
  // Валидация сообщения
  if (!message) {
    showError('message', 'Wiadomość jest wymagana');
    isValid = false;
  }
  
  // Если всё ок — показать успех
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

// ===== Инициализация после загрузки =====
document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ Zadanie 4 i 5 - JavaScript załadowany | Denys Busko 77299');
  
  // Кнопки темы
  const themeRedBtn = document.getElementById('theme-red-btn');
  const themeGreenBtn = document.getElementById('theme-green-btn');
  if (themeRedBtn) themeRedBtn.addEventListener('click', () => changeTheme('red'));
  if (themeGreenBtn) themeGreenBtn.addEventListener('click', () => changeTheme('green'));
  
  // Кнопка скрытия секции
  const toggleBtn = document.getElementById('toggle-projects-btn');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleSection);
  
  // ✅ Валидация формы
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', validateForm);
    
    // Убирать ошибку при вводе
    ['firstName', 'lastName', 'email', 'message'].forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener('input', () => clearError(fieldId));
      }
    });
  }
});