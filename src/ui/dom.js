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
      projectTitle.addEventListener('click', () => onProjectClick(project.name));
      projectDiv.appendChild(projectTitle);
      renderTodos(project, projectDiv, onDeleteTodo, onEditTodo);
      projectTodoList.appendChild(projectDiv);
    });
  };
  
  export const renderTodos = (project, container, onDelete, onEdit) => {
    const todoList = document.createElement('ul');
    project.getTodos().forEach(todo => {
      const todoItem = document.createElement('li');
      todoItem.innerHTML = `
        <strong>${todo.title}</strong> (${todo.priority})<br>
        Description: ${todo.description || 'None'}<br>
        Due: ${todo.dueDate || 'Not set'}<br>
        Notes: ${todo.notes || 'None'}<br>
        Completed: ${todo.completed ? 'Yes' : 'No'}
      `;
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => onDelete(project.name, todo.title));
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', () => onEdit(project.name, todo));
      todoItem.appendChild(deleteBtn);
      todoItem.appendChild(editBtn);
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
        <label>Title: <input type="text" id="todo-title" value="${todo ? todo.title : ''}" required></label><br>
        <label>Description: <textarea id="todo-description">${todo ? todo.description : ''}</textarea></label><br>
        <label>Due Date: <input type="date" id="todo-due-date" value="${todo ? todo.dueDate : ''}"></label><br>
        <label>Priority:
          <select id="todo-priority">
            <option value="low" ${todo && todo.priority === 'low' ? 'selected' : ''}>Low</option>
            <option value="medium" ${todo && todo.priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="high" ${todo && todo.priority === 'high' ? 'selected' : ''}>High</option>
          </select>
        </label><br>
        <label>Notes: <textarea id="todo-notes">${todo ? todo.notes : ''}</textarea></label><br>
        <label>Completed: <input type="checkbox" id="todo-completed" ${todo && todo.completed ? 'checked' : ''}></label><br>
        <input type="hidden" id="todo-project" value="${projectName}">
        <button type="submit">${todo ? 'Update Todo' : 'Add Todo'}</button>
        <button type="button" id="cancel-todo">Cancel</button>
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