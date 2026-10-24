import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { tokenStore } from '../../api/client'
import type { User } from '../../types/user'
interface AuthState {
    user: User | null,
    token: string | null
}

const initialState: AuthState = {
    user: null,
    token: tokenStore.get()
}

const authSlice = createSlice({
        name: 'auth',
        initialState: initialState,
        reducers: {
            setCredentials: (state, action : PayloadAction<AuthState>) => {
                state.user = action.payload.user
                state.token = action.payload.token
            },
            logout: (state) => {
                state.user = null
                state.token = null
            }
        }
    }
)

export default authSlice.reducer