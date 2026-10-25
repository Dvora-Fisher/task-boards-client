import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tokenStore } from "../../api/client";
import { logout, setCredentials } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login, register, logout as logoutRequest, getMe }  from "./authApi" ;

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

export function useMe(){
    const token = useAppSelector((state) => state.auth.token)
    const user = useAppSelector((state) => state.auth.user)
    return useQuery({
        queryKey: ['me'],
        queryFn: getMe,
        enabled: !!token && !user,
        retry: false
    })
}