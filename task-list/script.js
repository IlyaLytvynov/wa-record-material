
function todoList(root) {
  const container = document.createElement('div');
  const ul = document.createElement('ul');
  ul.classList.add('task-items');
  container.classList.add('task-list');
  const readFromStorage = () => {
    const dataAtStorage = localStorage.getItem('TASK_LIST');
    console.log(dataAtStorage)
    if (!dataAtStorage) {
      return [];
    }
    return JSON.parse(dataAtStorage);
  };
  let tasks = readFromStorage();

  const renderList = () => {
    let content = '';

    for (let task of tasks) {
      const item = `
        <li class="task-item ${task.completed ? 'completed' : ''}" id="${task.id}">
          <span class="task-text">${task.title}</span>
          <button class="task-delete">Видалити</button>
          <button  class="task-complete">Завершити</button>
        </li>`;
      content = content + item;
      console.log(content);
    }

    ul.innerHTML = content;
  };

  const renderForm = () => {
    const form = document.createElement('form');
    form.classList.add('task-form');
    form.insertAdjacentHTML('beforeend', `
        <input
          type="text"
          class="task-input"
          id="taskInput"
          placeholder="Додати нову задачу"
        />
        <button class="task-button" id="addTaskButton">Додати</button>
    `);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = e.target[0];
      const title = input.value;
      console.log(input.value);
      tasks.push({
        id: `${Date.now()}`,
        title,
        completed: false
      });
      input.value = '';
      renderList();
      saveToStorage();
      console.log(tasks);
    });
    container.appendChild(form);
  };

  const saveToStorage = () => {
    localStorage.setItem('TASK_LIST', JSON.stringify(tasks));
  };


  renderForm();
  ul.addEventListener('click', (e) => {
    const li = e.target.parentElement;

    const taskId = li.id;

    if (e.target.classList.contains('task-delete')) {
      tasks = tasks.filter((task) => {
        return task.id !== taskId;
      });
      saveToStorage();
    }

    if (e.target.classList.contains('task-complete')) {
      tasks = tasks.map((task) => {
        if (task.id === taskId) {
          task.completed = !task.completed;
        }
        return task;
      });
      saveToStorage();
    }
    renderList();
  });
  container.appendChild(ul);
  renderList();
  root.appendChild(container);
}

todoList(document.querySelector('body'));