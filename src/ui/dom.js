



export const renderProjects = (projects, currentProject, onProjectClick, onDeleteTodo, onEditTodo) => {
    const projectTodoList = document.getElementById('project-todo-list');
    if (!projectTodoList) {
      console.error('Project todo list element not found');
      return;
    }
    projectTodoList.innerHTML = '';
    projects.forEach(project => {
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project';
      const projectTitle = document.createElement('h2');
      projectTitle.textContent = project.name;
      projectTitle.className = project === currentProject ? 'active' : '';
      projectTitle.classList.add('project-title')
      projectTitle.addEventListener('click', () => onProjectClick(project.name));
      projectDiv.appendChild(projectTitle);
      renderTodos(project, projectDiv, onDeleteTodo, onEditTodo);
      projectTodoList.appendChild(projectDiv);
    });
  };
  
  export const renderTodos = (project, container, onDelete, onEdit) => {
  const todoList = document.createElement('ul');

  project.getTodos().forEach(todo => {
    // Parse dueDate as local date to avoid UTC shift
    let dueDateText = '';
    if (todo.dueDate) {
      // Split the date string (e.g., "2025-06-11") and create a local date
      const [year, month, day] = todo.dueDate.split('-').map(Number);
      const localDate = new Date(year, month - 1, day); // month is 0-based in JS

      const options = { month: 'long', day: 'numeric' };
      dueDateText = new Intl.DateTimeFormat('en-US', options).format(localDate);
    }

    const todoItem = document.createElement('li');
    todoItem.innerHTML = `
      <div id="todo-name-div">
        <strong>${todo.title}</strong><br>
        <div class="flex">
          <p>${dueDateText || 'Not set'}</p>
          <div id="todo-status-div"><span class="priority"  id="${todo.priority}"> </span>${todo.priority}</div>
        </div>
      </div>
    `;
    const deleteBtn = document.createElement('button');
    const todoStatusDiv = document.createElement('div');
    todoStatusDiv.id = 'todo-status-div';
    deleteBtn.innerHTML = `
      <span class="material-symbols-outlined todo-list-btn">delete</span>
    `;
    deleteBtn.addEventListener('click', () => onDelete(project.name, todo.title));
    const editBtn = document.createElement('button');
    editBtn.innerHTML = `<span id="todo-edit-btn">edit</span>`;
    editBtn.addEventListener('click', () => onEdit(project.name, todo));
    todoItem.classList.add('todo-ul');

    todoStatusDiv.appendChild(editBtn);
    todoStatusDiv.appendChild(deleteBtn);

    todoItem.appendChild(todoStatusDiv);
    todoList.appendChild(todoItem);
  });
  container.appendChild(todoList);
};
  
  export const renderTodoForm = (projectName, todo = null, onSubmit, onCancel) => {
    const formContainer = document.getElementById('todo-form-container');
    if (!formContainer) {
      console.error('Todo form container not found');
      return;
    }
    formContainer.innerHTML = `
      <form id="todo-form">
        <input type="text" id="todo-title" value="${todo ? todo.title : ''}" placeholder= "Enter title here" required><br>
        <textarea id="todo-description" placeholder="add description...">${todo ? todo.description : ''}</textarea></label><br>
        <label class="todo-form-flex">Date: <input type="date" id="todo-due-date" value="${todo ? todo.dueDate : ''}"></label><br>
        <label class="todo-form-flex">Priority:
          <select id="todo-priority">
            <option value="low" ${todo && todo.priority === 'low' ? 'selected' : ''}>Low</option>
            <option value="medium" ${todo && todo.priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="high" ${todo && todo.priority === 'high' ? 'selected' : ''}>High</option>
          </select>
        </label><br>
        <label class="todo-form-flex">Completed: <input type="checkbox" id="todo-completed" ${todo && todo.completed ? 'checked' : ''}></label><br>
         <input type="hidden" id="todo-project" value="${projectName}">
        <div class="todo-form-flex" id="todo-buttons"><div id="todo-new"><button type="submit">${todo ? 'Update' : 'Add'}</button></div><button type="button" id="cancel-todo">Cancel</button></div>
      </form>
    `;
    const form = document.getElementById('todo-form');
    const cancelBtn = document.getElementById('cancel-todo');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      onSubmit();
    });
    cancelBtn.addEventListener('click', onCancel);
  };