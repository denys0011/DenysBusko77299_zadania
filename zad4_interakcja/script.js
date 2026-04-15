// ✅ script.js - Интерактив для задания 4

// 1. Переключение темы (красная/зелёная)
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

// 3. Инициализация после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ Zadanie 4 - JavaScript załadowany poprawnie');
  
  // Привязываем кнопки (если они есть на странице)
  const themeRedBtn = document.getElementById('theme-red-btn');
  const themeGreenBtn = document.getElementById('theme-green-btn');
  const toggleBtn = document.getElementById('toggle-projects-btn');
  
  if (themeRedBtn) themeRedBtn.addEventListener('click', () => changeTheme('red'));
  if (themeGreenBtn) themeGreenBtn.addEventListener('click', () => changeTheme('green'));
  if (toggleBtn) toggleBtn.addEventListener('click', toggleSection);
});