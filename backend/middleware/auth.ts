import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
     const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, config.jwtPrivateKey);
        req.user = decoded as { id: string, isAdmin: boolean }; // Extend Request type if necessary
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};
