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

  //Handle projects list
  const handleRemoveProject = (name) => {
    projectManager.removeProject(name);
    renderUI();
    // document.getElementById('project-name').innerHTML = ''; // Clear form
  }


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

      
      const projectList = Object.values(projectManager.getProjects());
      console.log(projectList)

      const projectNames = [];
      for (let i=0; i < projectList.length; i++){
        projectNames.push(projectList[i].name)
        console.log(projectNames)
      }
      
      for (const item of projectNames) {
        const project = document.createElement('p')

        const projectItem = document.getElementById(item);
        if (projectItem) {
          console.log(true)
          

        }

        else if (!projectItem){
          project.innerHTML =`${item}`;
          project.id = item;
          projectListDiv.append(project);
        }
      }

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


  //Handle list of projects and delete buttons

    // for(project in projectManager.getProjects().name) {
      // console.log(projectManager.getProjects() )
      // projectList.append(project.name)

      
      // const project = document.createElement('p')
      // project.innerHTML =`${projectManager.getProjects()[project].name}`
      // projectListDiv.innerHTML += project
    // }
    // const test = projectManager.getProjects()[0].name;
    // projectListDiv.innerHTML = test;
    
  if (projectListDiv) {
    
  }
  console.log(projectManager.getProjects().name)
  
  // Initial render
  renderUI();
};