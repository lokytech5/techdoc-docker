import express from "express";
import { authenticate } from "../middleware/auth";
import { generateGuide, getGuideById, getGuidesByProjectId, getUserGuides } from "../controller/guideController";

export const router = express.Router();

router.get('/user-guides', authenticate, getUserGuides);
router.post('/generate-custom/:projectId', authenticate, generateGuide);
router.get('/project/:projectId', authenticate, getGuidesByProjectId);
router.get('/:guideId', authenticate, getGuideById);



export { router as guideRouter}