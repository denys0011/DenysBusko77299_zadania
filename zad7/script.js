// ✅ script.js - Zadanie 7: Local Storage
// Denys Busko 77299

const STORAGE_KEY = 'denys_busko_77299_tasks';

// ===== Local Storage Functions =====

// Load tasks from localStorage
function loadTasks() {
    const tasksJSON = localStorage.getItem(STORAGE_KEY);
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

// Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    updateLastUpdate();
    updateTasksCount();
}

// Add new task
function addTask(text) {
    const tasks = loadTasks();
    const newTask = {
        id: Date.now(),
        text: text.trim(),
        createdAt: new Date().toLocaleString('pl-PL')
    };
    tasks.push(newTask);
    saveTasks(tasks);
    renderTasks();
    console.log('✅ Zadanie 7 - Dodano notatkę:', newTask, '| Denys Busko 77299');
}

// Delete task
function deleteTask(id) {
    let tasks = loadTasks();
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
    renderTasks();
    console.log('✅ Zadanie 7 - Usunięto notatkę ID:', id, '| Denys Busko 77299');
}

// Render all tasks
function renderTasks() {
    const tasks = loadTasks();
    const tasksList = document.getElementById('tasks-list');
    const emptyMsg = document.getElementById('empty-msg');
    
    if (!tasksList) return;

    if (tasks.length === 0) {
        tasksList.innerHTML = '';
        emptyMsg.style.display = 'block';
        return;
    }

    emptyMsg.style.display = 'none';
    tasksList.innerHTML = '';

    // Check active theme
    const link = document.querySelector('link[rel="stylesheet"]');
    const isGreen = link && link.href.includes('green.css');

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = isGreen ? 'task-item green' : 'task-item';
        
        taskDiv.innerHTML = `
            <div class="task-content">
                <div class="task-text">${escapeHtml(task.text)}</div>
                <div class="task-date">📅 ${task.createdAt}</div>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️ Usuń</button>
        `;
        
        tasksList.appendChild(taskDiv);
    });
}

// Update tasks count
function updateTasksCount() {
    const countElement = document.getElementById('tasks-count');
    if (countElement) {
        const tasks = loadTasks();
        countElement.textContent = tasks.length;
    }
}

// Update last update time
function updateLastUpdate() {
    const lastUpdateSpan = document.getElementById('last-update');
    if (lastUpdateSpan) {
        lastUpdateSpan.textContent = new Date().toLocaleString('pl-PL');
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== ZADANIE 4: Change Theme (kept from previous) =====
function changeTheme(theme) {
    const link = document.querySelector('link[rel="stylesheet"]');
    if (link) {
        link.href = theme === 'red' ? 'red.css' : 'green.css';
        renderTasks(); // Re-render to update border colors
    }
}

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Zadanie 7 - Local Storage załadowany | Denys Busko 77299');
    
    // Load and render tasks
    renderTasks();
    updateTasksCount();
    updateLastUpdate();

    // Add task form
    const addTaskForm = document.getElementById('add-task-form');
    if (addTaskForm) {
        addTaskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const taskInput = document.getElementById('task-input');
            const text = taskInput.value.trim();
            
            if (text) {
                addTask(text);
                taskInput.value = '';
            }
        });
    }

    // Theme buttons
    const themeRedBtn = document.getElementById('theme-red-btn');
    const themeGreenBtn = document.getElementById('theme-green-btn');
    if (themeRedBtn) themeRedBtn.addEventListener('click', () => changeTheme('red'));
    if (themeGreenBtn) themeGreenBtn.addEventListener('click', () => changeTheme('green'));
});
