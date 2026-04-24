
  let tasks = [
    { id: 1, text: 'Learn Node.js',      done: false },
    { id: 2, text: 'Build a Todo App',   done: false },
    { id: 3, text: 'Learn Express.js',   done: true  },
    { id: 4, text: 'Deploy to Render',   done: false },
  ];
  let filter = 'all';
  let nextId = 5;

  const taskInput = document.getElementById('taskInput');
  taskInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });

  function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;
   
  }

  function toggleTask(id) {
    const t = tasks.find(t => t.id === id);
    if (t) t.done = !t.done;
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    render();
  }

  function startEdit(id) {
    const t = tasks.find(t => t.id === id);
    if (!t) return;
    const item = document.querySelector(`[data-id="${id}"]`);
    const label = item.querySelector('.task-label');
    const actions = item.querySelector('.task-actions');
    const input = document.createElement('input');
    input.className = 'edit-input';
    input.value = t.text;
    label.replaceWith(input);
    input.focus();
    actions.innerHTML = `
      <button class="icon-btn" onclick="saveEdit(${id})">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--indigo)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </button>`;
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') saveEdit(id);
      if (e.key === 'Escape') render();
    });
  }

  function saveEdit(id) {
    const t = tasks.find(t => t.id === id);
    const input = document.querySelector(`[data-id="${id}"] .edit-input`);
    if (t && input) {
      const val = input.value.trim();
      if (val) t.text = val;
    }
    render();
  }

  function clearCompleted() {
    tasks = tasks.filter(t => !t.done);
    render();
  }

  function setFilter(f, btn) {
    filter = f;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  }

  function render() {
    const list = document.getElementById('taskList');
    const visible = tasks.filter(t =>
      filter === 'all' ? true : filter === 'completed' ? t.done : !t.done
    );

    if (!visible.length) {
      list.innerHTML = `<div class="empty">No tasks to show.</div>`;
    } else {
      list.innerHTML = `<div class="task-list">${visible.map(t => `
        <div class="task-item" data-id="${t.id}">
          <input type="checkbox" class="task-check" ${t.done ? 'checked' : ''} onchange="toggleTask(${t.id})"/>
          <span class="task-label ${t.done ? 'done' : ''}">${escHtml(t.text)}</span>
          <div class="task-actions">
            <button class="icon-btn edit" onclick="startEdit(${t.id})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button class="icon-btn del" onclick="deleteTask(${t.id})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/>
                <path d="M9 6V4h6v2"/>
              </svg>
            </button>
          </div>
        </div>`).join('')}</div>`;
    }

    const done    = tasks.filter(t => t.done).length;
    const pending = tasks.filter(t => !t.done).length;
    document.getElementById('totalCount').textContent   = tasks.length;
    document.getElementById('doneCount').textContent    = done;
    document.getElementById('pendingCount').textContent = pending;
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  render();