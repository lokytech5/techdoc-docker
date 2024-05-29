import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { Request, Response} from "express";
import { generateAuthToken } from "../service/jwtToken";
import { authSchema } from "../validation/authValidator";

const prisma = new PrismaClient()

export const createAuth = async (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(400).send({ error: 'Request body is missing'});
    }

    const { error, value } = authSchema.validate(req.body)

    if (error) {
        return res.status(400).send({ error: error.message});
    }

    const { username, password } = value;

    try {

        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        })

        if(!user) {
            return res.status(400).json({ msg: 'Invalid username or password' });
        }

        const validPassword = await compare(password, user.password)

        if(!validPassword) {
            return res.status(400).json({ msg: 'Invalid username or password' });
        }

        const token = generateAuthToken(user);

res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

res.send({ token, name: user.username, _id: user.id, email: user.email});

} catch (error) {
res.status(500).send({ error: 'Error during authentication process'});
}

}