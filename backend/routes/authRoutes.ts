import express from "express";
import { createAuth } from "../controllers/authController";


export const authRoute = express.Router();

authRoute.post('/login', createAuth)