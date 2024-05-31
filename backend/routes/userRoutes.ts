import express from "express";
import { addUser, getUserById} from "../controllers/userController";
import { validateCreateUserRequest } from "../validation/userValidation";
import { authenticate } from "../middleware/auth";

export const userRouter = express.Router();

userRouter.post('/add-user', addUser)
userRouter.get('/:id', authenticate, getUserById)