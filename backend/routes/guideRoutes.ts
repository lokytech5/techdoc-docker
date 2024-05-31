import express from "express";
import { authenticate } from "../middleware/auth";
import { generateCustomGuide, getGuideById, getGuidesByProjectId, getUserGuides } from "../controllers/gudieController";

export const router = express.Router();

router.get('/user-guides', authenticate, getUserGuides);
router.post('/generate-custom/:projectId', authenticate, generateCustomGuide);
router.get('/project/:projectId', authenticate, getGuidesByProjectId);
router.get('/:guideId', authenticate, getGuideById);




export { router as guideRouter}