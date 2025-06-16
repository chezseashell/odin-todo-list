export const saveProjects = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};
  
export const loadProjects = () => {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  return projects;
};