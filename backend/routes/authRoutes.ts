import express from "express";
import { createAuth } from "../controller/authController";

const router = express.Router();

router.post('/login', createAuth);

export { router as authRouter}