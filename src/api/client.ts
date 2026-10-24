import type { ApiSuccess, ErrorCode, ApiErrorBody } from "../types"

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

export interface ApiOptions {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
    body?: unknown,
    query?: object
}

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
    const url = new URL('/api' + path, API_URL)
    const params = new URLSearchParams(
        Object.entries(options.query ?? {})
            .filter(([_, value]) => value !== undefined && value !== null && value !== '')
            .map(([key, value]) => [key, String(value)])
    )
    url.search = params.toString()

    const headers: Record<string, string> = {}
    const token = tokenStore.get()
    if (token !== null) {
        headers['Authorization'] = ` Bearer${token}`
    }
    if (options.body !== undefined) {
        headers['Content-Type'] = 'application/json'
    }
    const res = await fetch(url,
        {
            method: options.method ?? 'GET',
            headers: headers,
            body: options.body !== null ? JSON.stringify(options.body) : undefined
        })
    //errors checking
    if (res.status === 204)
        return undefined as T
    const json: ApiSuccess<T> | ApiErrorBody = await res.json()
    if (!json.success) {
        if (res.status === 401) {
            tokenStore.clear()
        }
        throw new ApiError(res.status, json.error.code, json.error.code, json.error.details)
    }
    console.log(res)
    return json.data
}
