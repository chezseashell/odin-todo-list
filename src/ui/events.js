import { ProjectManger } from '../models/ProjectManager.js';
import { toDo } from '../models/toDoClass.js';
import { renderProjects, renderTodos, renderTodoForm } from './dom.js';

export const setupEventListeners = (projectManager) => {
  const addTodoBtn = document.getElementById('add-todo-btn');
  const addProjectForm = document.getElementById('add-project-form');
  const projectListBtn = document.getElementById('project-list-button');

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
      handleEditTodo,
      // handleRemoveProject,

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
    addProjectForm.style.display = 'none'; // Hide form after submission
  });


  // Remove Project






  // Toggle List of Projects on Project list icon click




  // Toggle add project form on list icon click
  const projectListIcon = document.getElementById('project-list-button');
  const projectListDiv = document.getElementById('project-list-div');
  
if (projectListIcon) {
  projectListIcon.addEventListener('click', () => {
    addProjectForm.style.display = addProjectForm.style.display === 'none' ? 'flex' : 'none';

    const projectList = projectManager.getProjects();
    
    // Clear existing project list to avoid duplicates
    projectListDiv.innerHTML = '';

    // Render all projects, including Home
    for (const project of projectList) {
      const projectDiv = document.createElement('div');
      projectDiv.innerHTML = `<p>${project.name}</p><span class="material-symbols-outlined project-delete-btn">delete</span>`;
      projectDiv.id = project.name;
      projectDiv.className = 'project-sub-name';
      projectListDiv.append(projectDiv);
    }

    // Handle delete project button click
    const deleteProjectIcons = document.querySelectorAll('.project-delete-btn');
    deleteProjectIcons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        const projectDiv = btn.parentElement; // Get the parent div
        const projectName = projectDiv.id; // Get the project name from div id
        
        // Optional: Prevent deletion of Home project
        if (projectName === 'Home') {
          console.warn('Cannot delete the Home project');
          alert('Cannot delete Home Project')
          return;
        }

        // Remove from projectManager
        projectManager.removeProject(projectName);
        
        // Remove from DOM
        projectListDiv.removeChild(projectDiv);
        
        // Update UI
        renderUI();
      });
    });
  });
} else {
  console.error('Project list icon not found');
}

  // Handle cancel button for add project form
  const cancelProjectBtn = document.getElementById('cancel-project');
  if (cancelProjectBtn) {
    cancelProjectBtn.addEventListener('click', () => {
      addProjectForm.style.display = 'none';
      addProjectForm.reset();
    });
  }



  

    
  if (projectListDiv) {
    
  }
  console.log(projectManager.getProjects().name)
  
  // Initial render
  renderUI();
};