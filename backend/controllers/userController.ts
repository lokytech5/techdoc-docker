import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { CreateUserRequest } from '../interface/UserInterfaces';
import { genSalt, hash } from 'bcrypt';
import _ from 'lodash';
import { generateAuthToken } from '../service/token';

const prisma = new PrismaClient();

export const addUser = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send({ error: 'Request body is missing'});
}

try {

    const { email } = req.body;

     // Check if the user already exists
    const checkUser = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    if (checkUser) {
        return res.status(400).json({ message: 'User already exists'})
    }

    const user: CreateUserRequest = _.pick(req.body, ['username', 'password', 'email', 'isAdmin']);

    // Generate salt and hash the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(user.password, salt); 

   
    const savedUser = await prisma.user.create({
        data: {
            username: user.username,
            email: user.email,
            password: hashedPassword,
            isAdmin: user.isAdmin
        }
    });

    // Generate token
    const token = generateAuthToken(savedUser);

    res.status(201).header('x-auth-token', token).send(_.pick(savedUser, ['id', 'username', 'email', 'isAdmin']));
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'An error occurred while creating the user' });
}
}

export const getUserById = async (req: Request, res: Response) => {

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: req.params.id
            }
        })
    
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        res.status(200).send(_.pick(user, ['_id', 'username', 'email']));
    } catch (error) {
        res.status(500).send({ error: "error while getting user by id"});
    }
}
