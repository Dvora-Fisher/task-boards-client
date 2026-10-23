import type { ErrorCode } from "../types"

const API_URL = import.meta.env.VITE_API_URL
const TOKEN_KEY = 'accessToken'
export const tokenStore = {
    get() {
        return localStorage.getItem(TOKEN_KEY)
    },
    set(token: string) {
        localStorage.setItem(TOKEN_KEY, token)
    },
    clear() {
        localStorage.removeItem(TOKEN_KEY)
    }

}

export class ApiError extends Error {
    status: number;
    code: ErrorCode;
    details?: unknown;
    constructor(status: number, code: ErrorCode, message: string, details?: unknown) {
        super(message)
        this.status = status;
        this.code = code;
        this.details = details;
        this.name = 'ApiError'
    }
}
