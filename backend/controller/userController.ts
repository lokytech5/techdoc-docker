import { PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcrypt";
import { Request, Response } from "express";
import _ from "lodash";
import { generateAuthToken } from "../service/jwtToken";
import { userSchema } from "../validation/userValidator";


const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({ error: 'Request body is missing'});
    }

    const { error, value } = userSchema.validate(req.body);
    if(error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    const { email, username, password } = value

    try {

         // Check if the user already exists
        const checkUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (checkUser) {
            return res.status(400).json({ message: 'User already exists'})
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt); 

       
        const savedUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
            }
        });

    const token = generateAuthToken(savedUser);

        res.status(201).header('x-auth-token', token).send(_.pick(savedUser, ['id', 'username', 'email', 'isAdmin', 'updated_at', 'created_at']));
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

        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).send(_.pick(user, ['id','username', 'email' ]));
        
    } catch (error) {
        res.status(500).send({error: "error while getting user by id"})
    }
}