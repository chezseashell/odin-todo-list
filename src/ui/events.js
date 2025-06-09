import { toDo } from '../models/toDoClass.js';
import { renderProjects, renderTodos, renderTodoForm } from './dom.js';

export const setupEventListeners = (projectManager) => {
  const addTodoBtn = document.getElementById('add-todo-btn');
  const addProjectForm = document.getElementById('add-project-form');

  if (!addTodoBtn || !addProjectForm) {
    console.error('Required elements not found');
    return;
  }

  // Helper function to render UI
  const renderUI = () => {
    renderProjects(
      projectManager.getProjects(),
      projectManager.getCurrentProject(),
      handleProjectSwitch,
      handleDeleteTodo,
      handleEditTodo
    );
  };

  // Handle project switch
  const handleProjectSwitch = (name) => {
    projectManager.setCurrentProject(name);
    renderUI();
    document.getElementById('todo-form-container').innerHTML = ''; // Clear form
  };

  // Handle todo deletion
  const handleDeleteTodo = (projectName, title) => {
    const project = projectManager.getProjects().find(p => p.name === projectName);
    if (project) {
      project.removeTodo(title);
      renderUI();
    }
  };

  // Handle todo editing
  const handleEditTodo = (projectName, todo) => {
    renderTodoForm(projectName, todo, () => {
      const updatedTodo = {
        title: document.getElementById('todo-title').value.trim(),
        description: document.getElementById('todo-description').value.trim(),
        dueDate: document.getElementById('todo-due-date').value,
        priority: document.getElementById('todo-priority').value,
        // notes: document.getElementById('todo-notes').value.trim(),
        completed: document.getElementById('todo-completed').checked,
      };
      todo.update(updatedTodo);
      renderUI();
      document.getElementById('todo-form-container').innerHTML = ''; // Clear form
    }, () => {
      document.getElementById('todo-form-container').innerHTML = ''; // Cancel
    });
  };

  // Add Todo button
  addTodoBtn.addEventListener('click', () => {
    const currentProjectName = projectManager.getCurrentProject().name;
    renderTodoForm(currentProjectName, null, () => {
      const newTodo = new toDo(
        document.getElementById('todo-title').value.trim(),
        document.getElementById('todo-description').value.trim(),
        document.getElementById('todo-due-date').value,
        document.getElementById('todo-priority').value,
        // document.getElementById('todo-notes').value.trim(),
        document.getElementById('todo-completed').checked
      );
      const projectName = document.getElementById('todo-project').value;
      const project = projectManager.getProjects().find(p => p.name === projectName);
      if (project) {
        project.addTodo(newTodo);
        renderUI();
        document.getElementById('todo-form-container').innerHTML = ''; // Clear form
      }
    }, () => {
      document.getElementById('todo-form-container').innerHTML = ''; // Cancel
    });
  });

  // Add Project
  addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('project-name').value.trim();
    if (!name) {
      console.warn('Project name cannot be empty');
      return;
    }
    if (projectManager.getProjects().some((project) => project.name === name)) {
      console.warn('Project name already exists');
      return;
    }
    projectManager.addProject(name);
    renderUI();
    addProjectForm.reset();
  });

  // Initial render
  renderUI();
};