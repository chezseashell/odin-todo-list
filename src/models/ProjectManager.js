import { Project } from  './Project.js';

export class ProjectManger {
  constructor() {
    this.projects = [new Project('Home')];
    this.currentProject = this.projects[0];
  }

  addProject(name) {
    const project = new Project(name);
    this.projects.push(project);
    return project;
  }

  removeProject(name) {
    if (name === 'Home') return;
    this.projects = this.projects.filter(project => project.name !== name);
    if (this.currentProject.name === name) {
      this.currentProject = this.projects[0];
    }
  }

  setCurrentProject(name) {
    const project = this.projects.find(project => project.name === name);
    if (project) this.currentProject = project;
  }

  getCurrentProject() {
    return this.currentProject;
  }

  getProjects() {
    return this.projects;
  }
}