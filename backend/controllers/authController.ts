import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { Request, Response} from "express";
import { CreateUserRequest } from "../interface/UserInterfaces";
import { generateAuthToken } from "../service/token";

const prisma = new PrismaClient()

export const createAuth = async (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).send({ error: 'Request body is missing'});
    }

    try {

        const user = await prisma.user.findFirst({
            where: {
                username: req.body.username,
            }
        })

        if(!user) {
            return res.status(400).json({ msg: 'Invalid username or password' });
        }

        const validPassword = await compare(req.body.password, user.password)

        if(!validPassword) {
            return res.status(400).json({ msg: 'Invalid username or password' });
        }

        const token = generateAuthToken(user);
// Set JWT token as HttpOnly cookie
res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

res.send({ token, username: user.username, _id: user.id, email: user.email});

} catch (error) {
res.status(500).send({ error: 'Error during authentication process'});
}

}