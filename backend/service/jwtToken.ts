import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";


export function generateAuthToken(user: User): string {
    return sign({ id: user.id, isAdmin: user.isAdmin }, config.jwtPrivateKey,{
            expiresIn: config.jwtExpiresIn
        })
}