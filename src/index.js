import "./styles.css";
import { ProjectManger } from "./models/ProjectManager";
import { setupEventListeners } from "./ui/events";

const projectManager = new ProjectManger();
setupEventListeners(projectManager);