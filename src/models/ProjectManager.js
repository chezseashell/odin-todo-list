import Project from './Project.js';

export default class ProjectManager {
  constructor() {
    this.projects = [new Project('Home')];
    [this.currentProject] = this.projects;
  }

  addProject(name) {
    const project = new Project(name);
    this.projects.push(project);
    return project;
  }

  removeProject(name) {
    if (name === 'Home') return;
    this.projects = this.projects.filter((project) => project.name !== name);
    if (this.currentProject.name === name) {
      [this.currentProject] = this.projects;
    }
  }

  setCurrentProject(name) {
    const currproject = this.projects.find((proj) => proj.name === name);
    if (currproject) this.currentProject = currproject;
  }

  getCurrentProject() {
    return this.currentProject;
  }

  getProjects() {
    return this.projects;
  }
}
