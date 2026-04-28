// ✅ script.js - Zadanie 7: Local Storage
// Denys Busko 77299

const STORAGE_KEY = 'denys_busko_77299_tasks';

// Загрузка задач из localStorage
function loadTasks() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Сохранение в localStorage
function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Отрисовка списка
function renderTasks() {
    const tasks = loadTasks();
    const list = document.getElementById('tasks-list');
    const emptyMsg = document.getElementById('empty-msg');
    
    list.innerHTML = '';
    
    if (tasks.length === 0) {
        emptyMsg.style.display = 'block';
        return;
    }
    
    emptyMsg.style.display = 'none';
    
    // Проверяем активную тему для цвета бордера
    const isGreen = document.querySelector('link[rel="stylesheet"]').href.includes('green.css');
    
    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = isGreen ? 'task-item green' : 'task-item';
        div.innerHTML = `
            <span>${escapeHtml(task.text)}</span>
            <button class="delete-btn" data-id="${task.id}">️ Usuń</button>
        `;
        list.appendChild(div);
    });
}

// Добавление задачи
function addTask(text) {
    const tasks = loadTasks();
    tasks.push({ id: Date.now(), text: text.trim() });
    saveTasks(tasks);
    renderTasks();
    console.log('✅ Zad7: Dodano notatkę | Denys Busko 77299');
}

// Удаление задачи
function deleteTask(id) {
    let tasks = loadTasks();
    tasks = tasks.filter(t => t.id !== id);
    saveTasks(tasks);
    renderTasks();
    console.log('✅ Zad7: Usunięto notatkę | Denys Busko 77299');
}

// Защита от XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Смена темы (из Zad4)
function changeTheme(theme) {
    document.querySelector('link[rel="stylesheet"]').href = theme === 'red' ? 'red.css' : 'green.css';
    renderTasks(); // Перерисовка для обновления цвета бордера
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Zadanie 7 - Local Storage załadowany | Denys Busko 77299');
    
    renderTasks();
    
    // Кнопки темы
    document.getElementById('theme-red-btn').addEventListener('click', () => changeTheme('red'));
    document.getElementById('theme-green-btn').addEventListener('click', () => changeTheme('green'));
    
    // Форма добавления
    document.getElementById('add-task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('task-input');
        if (input.value.trim()) {
            addTask(input.value);
            input.value = '';
        }
    });
    
    // Делегирование клика на кнопку удаления
    document.getElementById('tasks-list').addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = Number(e.target.dataset.id);
            deleteTask(id);
        }
    });
});