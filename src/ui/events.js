import TodoClass from '../models/TodoClass.js';
import { renderProjects, renderTodoForm } from './dom.js';

export default (projectManager) => {
  const addTodoBtn = document.getElementById('add-todo-btn');
  const addProjectForm = document.getElementById('add-project-form');

  if (!addTodoBtn || !addProjectForm) {
    throw new Error('Required elements not found');
  }

  let handleEditTodo;
  let handleDeleteTodo;
  let handleProjectSwitch;

  const renderUI = () => {
    renderProjects(
      projectManager.getProjects(),
      projectManager.getCurrentProject(),
      handleProjectSwitch,
      handleDeleteTodo,
      handleEditTodo,
    );
  };

  handleProjectSwitch = (name) => {
    projectManager.setCurrentProject(name);
    renderUI();
    document.getElementById('todo-form-container').innerHTML = '';
  };

  handleDeleteTodo = (projectName, title) => {
    const project = projectManager.getProjects().find((p) => p.name === projectName);
    if (project) {
      project.removeTodo(title);
      renderUI();
    }
  };

  handleEditTodo = (projectName, todo) => {
    renderTodoForm(projectName, () => {
      const updatedTodo = {
        title: document.getElementById('todo-title').value.trim(),
        description: document.getElementById('todo-description').value.trim(),
        dueDate: document.getElementById('todo-due-date').value,
        priority: document.getElementById('todo-priority').value,
        completed: document.getElementById('todo-completed').checked,
      };
      todo.update(updatedTodo);
      renderUI();
      document.getElementById('todo-form-container').innerHTML = '';
    }, () => {
      document.getElementById('todo-form-container').innerHTML = '';
    }, todo);
  };

  addTodoBtn.addEventListener('click', () => {
    const currentProjectName = projectManager.getCurrentProject().name;
    renderTodoForm(currentProjectName, () => {
      const newTodo = new TodoClass(
        document.getElementById('todo-title').value.trim(),
        document.getElementById('todo-description').value.trim(),
        document.getElementById('todo-due-date').value,
        document.getElementById('todo-priority').value,
        document.getElementById('todo-completed').checked,
      );

      const projectName = document.getElementById('todo-project').value;
      const project = projectManager.getProjects().find((p) => p.name === projectName);
      if (project) {
        project.addTodo(newTodo);
        renderUI();
        document.getElementById('todo-form-container').innerHTML = '';
      }
    }, () => {
      document.getElementById('todo-form-container').innerHTML = '';
    }, null);
  });

  addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('project-name').value.trim();

    if (!name) {
      throw new Error('Project name cannot be empty');
    }
    if (projectManager.getProjects().some((project) => project.name === name)) {
      throw new Error('Project name already exists');
    }

    projectManager.addProject(name);
    renderUI();
    addProjectForm.reset();
    addProjectForm.style.display = 'none';
  });

  const projectListIcon = document.getElementById('project-list-button');
  const projectListDiv = document.getElementById('project-list-div');

  if (projectListIcon) {
    projectListIcon.addEventListener('click', () => {
      addProjectForm.style.display = addProjectForm.style.display === 'none' ? 'flex' : 'none';

      const projectList = projectManager.getProjects();
      projectListDiv.innerHTML = '';

      projectList.forEach((project) => {
        const projectDiv = document.createElement('div');
        projectDiv.innerHTML = `<p>${project.name}</p><span class="material-symbols-outlined project-delete-btn">delete</span>`;
        projectDiv.id = project.name;
        projectDiv.className = 'project-sub-name';
        document.getElementById('project-list-button').setAttribute('aria-label', 'Toggle project list');
        projectListDiv.append(projectDiv);
      });

      const deleteProjectIcons = document.querySelectorAll('.project-delete-btn');
      deleteProjectIcons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const projectDiv = btn.parentElement;
          const projectName = projectDiv.id;

          if (projectName === 'Home') {
            const notification = document.createElement('div');
            notification.textContent = 'Cannot delete Home Project';
            notification.className = 'notification';
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
            return;
          }

          projectManager.removeProject(projectName);
          projectListDiv.removeChild(projectDiv);
          renderUI();
        });
      });
    });
  } else {
    throw new Error('Project list icon not found');
  }

  const cancelProjectBtn = document.getElementById('cancel-project');
  if (cancelProjectBtn) {
    cancelProjectBtn.addEventListener('click', () => {
      addProjectForm.style.display = 'none';
      addProjectForm.reset();
    });
  }

  renderUI();
};
