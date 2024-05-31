import Joi from 'joi';
import { CreateUserRequest } from '../interface/UserInterfaces';
import { NextFunction, Request, Response } from 'express';

export const createUserSchema = Joi.object<CreateUserRequest>({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const validateCreateUserRequest = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: "fill all fields"});
  }
  next();
};
