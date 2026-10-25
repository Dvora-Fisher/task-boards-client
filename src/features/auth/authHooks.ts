import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register } from "./authApi";
import { tokenStore } from "../../api/client";
import { logout, setCredentials } from "./authSlice";
import { useAppDispatch } from "../../app/hooks";
import { logout as logoutRequest }  from "./authApi" ;

export function useLogin() {
    const dispatch = useAppDispatch()
    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            tokenStore.set(data.accessToken)
            dispatch(setCredentials({
                user: data.user,
                token: data.accessToken
            }))
        }
    })
}

export function useRegister() {
    const dispatch = useAppDispatch()
    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            tokenStore.set(data.accessToken)
            dispatch(setCredentials({
                user: data.user,
                token: data.accessToken
            }))
        }
    })
}

export function useLogout() {
    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: logoutRequest,
        onSettled: () => {
            tokenStore.clear()
            dispatch(logout())
            queryClient.clear()
        }
    })
}