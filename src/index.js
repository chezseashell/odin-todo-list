import "./styles.css";
import  ProjectManager  from "./models/ProjectManager";
import setupEventListeners from "./ui/events";
import { renderTodos } from "./ui/dom";
import { Project } from "./models/Project";
import TodoClass from "./models/TodoClass";

const projectManager = new ProjectManager();

// Initialize first project with a default todo
const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
const defaultTodo = new TodoClass(
  "Default todo, edit me",
  "", 
  today, // Due date set to today
  "low", // Default priority
  false // Not completed
);
projectManager.getCurrentProject().addTodo(defaultTodo);


setupEventListeners(projectManager);



/* Initialize first project */

