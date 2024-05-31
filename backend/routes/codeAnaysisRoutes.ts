import express from "express";
import { createAnalysisCode } from "../controllers/codeAnalysisController";
import { authenticate } from "../middleware/auth";



export const userRouter = express.Router();

userRouter.post('/code', authenticate,  createAnalysisCode )

export { userRouter as codeAnalysisRouter }