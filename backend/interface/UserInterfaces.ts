import { Request } from "express";

export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

// interface AuthenticatedUser {
//     id: string;
//     isAdmin: boolean;
// }

// export interface AuthenticateRequest extends Request{
//     user?: AuthenticatedUser
// }