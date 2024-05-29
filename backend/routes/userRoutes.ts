import express from "express";
import { createUser, getUserById } from "../controller/userController";
import { authenticate } from "../middleware/auth";

export const userRouter = express.Router();


userRouter.post('/add-user', createUser)
userRouter.get('/:id', authenticate, getUserById)