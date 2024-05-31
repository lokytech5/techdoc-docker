import { User } from "@prisma/client";
import { config } from "../config/config";
import { Jwt, sign } from "jsonwebtoken";


export function generateAuthToken(user: User): string {
    return sign({ id: user.id, isAdmin: user.isAdmin }, config.jwtPrivateKey, {
        expiresIn: config.jwtExpiresIn,
    });
}