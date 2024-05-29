import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next:NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, config.jwtPrivateKey);
        req.user = decoded as { id: string, isAdmin: boolean };
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};