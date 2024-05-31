import express from "express";
import { createProject, getUserProjects, getProjectById, deleteProject } from "../controllers/projectController";
import uploadStrategy from "../middleware/fileUpload";
import { authenticate } from "../middleware/auth";


export const router = express.Router();

router.get('/user-projects', authenticate, getUserProjects);
router.post('/', authenticate, createProject);
router.get('/:projectId', authenticate, getProjectById);
router.delete('/:projectId', authenticate, deleteProject);

export { router as projectRouter }