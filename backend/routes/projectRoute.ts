import express from "express";
import { authenticate } from "../middleware/auth";
import { createProject, deleteProject, getProjectById, getUserProjects } from "../controller/projectController";
import uploadStrategy from "../middleware/fileUpload";


export const router = express.Router();

router.get('/user-projects', authenticate, getUserProjects);
router.post('/', authenticate, uploadStrategy, createProject);
router.get('/:projectId', authenticate, getProjectById);
router.delete('/:projectId', authenticate, deleteProject);

export { router as projectRouter};