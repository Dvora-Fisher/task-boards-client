import type { UUID, ISODateTime } from "./common"
export interface User {
    id: UUID;
    email: string;
    name: string;
    createdAt: ISODateTime
}
export type UserSummary = Pick<User, 'id' | 'name' | 'email'>

export interface AuthResult {
    user: User;
    accessToken: string;
    tokenType: 'Bearer';
    expiresAt: ISODateTime
}
export interface LoginInput {
    email: string;
    password: string
}
export interface RegisterInput extends LoginInput {
    name: string
}
