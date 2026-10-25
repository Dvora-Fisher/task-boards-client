import { api } from '../../api/client'
import type { AuthResult, LoginInput, RegisterInput, User } from '../../types/user'

export function login(input: LoginInput): Promise<AuthResult> {
    return api<AuthResult>(
        '/auth/login',
        {
            method: 'POST',
            body: input
        }
    )
}

export function register(input: RegisterInput): Promise<AuthResult> {
    return api<AuthResult>(
        '/auth/register',
        {
            method: 'POST',
            body: input
        }
    )
}

export function getMe(): Promise<{ user: User }> {
    return api<{ user: User }>(
        '/auth/me',
    )
}

export function logout(): Promise<{ loggedOut: boolean }> {
    return api<{ loggedOut: boolean }>(
        '/auth/logout',
        {
            method: 'POST',
        }
    )
}