import { useMutation } from "@tanstack/react-query";
import { login } from "./authApi";
import { tokenStore } from "../../api/client";
import { setCredentials } from "./authSlice";
import { useAppDispatch } from "../../app/hooks";


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