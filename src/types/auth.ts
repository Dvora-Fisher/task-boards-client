import type { User } from "./user"
export interface LoginRequest{
    email:string,
    password:string
}

export interface RegisterRequest{
    userName:string,
    email:string,
    passwors:string
}

export interface AuthRequest{
    user:User,
    token:string
}