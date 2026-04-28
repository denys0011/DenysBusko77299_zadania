// ✅ script.js - Zadanie 8: Backend (fetch POST)
// Denys Busko 77299

// 🔧 ТВОЙ Firebase URL (без слэша в конце)
const FIREBASE_URL = 'https://cv-denys-77299-default-rtdb.firebaseio.com';

// ===== Валидация (из zad5) =====
function isOnlyLetters(str) {
    return /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-']+$/.test(str.trim());
}
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function showError(id, msg) {
    const el = document.getElementById(id);
    const err = document.getElementById(id + '-error');
    if (el) el.classList.add('error');
    if (err) err.textContent = msg;
}
function clearError(id) {
    const el = document.getElementById(id);
    const err = document.getElementById(id + '-error');
    if (el) el.classList.remove('error');
    if (err) err.textContent = '';
}
function clearAllErrors() {
    ['firstName', 'lastName', 'email', 'message'].forEach(clearError);
}

// ===== Статус отправки =====
function showStatus(text, type) {
    const box = document.getElementById('status-box');
    box.textContent = text;
    box.className = 'status-box ' + type;
}
function hideStatus() {
    document.getElementById('status-box').className = 'status-box';
}

// ===== Отправка на Firebase =====
async function sendToBackend(formData) {
    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.textContent = '⏳ Wysyłanie...';
    showStatus('Wysyłanie danych na serwer Firebase...', 'loading');

    try {
        const payload = {
            ...formData,
            indexNumber: '77299',
            studentName: 'Denys Busko',
            sentAt: new Date().toISOString()
        };

        console.log('📤 Wysyłane dane:', payload);
        console.log('📍 Endpoint:', `${FIREBASE_URL}/messages.json`);

        // POST запрос в Firebase
        const response = await fetch(`${FIREBASE_URL}/messages.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`Błąd serwera: ${response.status}`);

        const result = await response.json();
        console.log('✅ Odpowiedź serwera:', result);
        console.log('✅ Zadanie 8 - Dane zapisane w Firebase | Denys Busko 77299');

        showStatus(`✅ Wiadomość wysłana! ID w bazie: ${result.name}`, 'success');
        document.getElementById('contact-form-backend').reset();

    } catch (error) {
        console.error('❌ Błąd wysyłki:', error);
        showStatus(`❌ ${error.message}. Sprawdź konsolę (F12).`, 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = '📤 Wyślij na serwer';
    }
}

// ===== Обработчик формы =====
document.getElementById('contact-form-backend').addEventListener('submit', function(e) {
    e.preventDefault();
    clearAllErrors();
    hideStatus();

    let valid = true;
    const firstName = document.getElementById('firstName').value.trim();
    const lastName  = document.getElementById('lastName').value.trim();
    const email     = document.getElementById('email').value.trim();
    const message   = document.getElementById('message').value.trim();

    if (!firstName || !isOnlyLetters(firstName)) { showError('firstName', 'Imię jest wymagane i nie może zawierać cyfr'); valid = false; }
    if (!lastName  || !isOnlyLetters(lastName))  { showError('lastName',  'Nazwisko jest wymagane i nie może zawierać cyfr'); valid = false; }
    if (!email     || !isValidEmail(email))      { showError('email',     'Podaj poprawny adres e-mail'); valid = false; }
    if (!message)                                { showError('message',   'Wiadomość jest wymagana'); valid = false; }

    if (valid) sendToBackend({ firstName, lastName, email, message });
});

// ===== Очистка ошибок при вводе =====
['firstName', 'lastName', 'email', 'message'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => clearError(id));
});

// ===== Смена темы (из zad4) =====
function changeTheme(theme) {
    document.querySelector('link[rel="stylesheet"]').href = theme === 'red' ? 'red.css' : 'green.css';
}
document.getElementById('theme-red-btn').addEventListener('click', () => changeTheme('red'));
document.getElementById('theme-green-btn').addEventListener('click', () => changeTheme('green'));

console.log('✅ Zadanie 8 - Backend gotowy | Denys Busko 77299');