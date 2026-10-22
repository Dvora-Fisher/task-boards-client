import { Navigate, Outlet, useLocation } from "react-router-dom"
import {tokenStore} from '../api/client'
export function ProtectedRoute(){
    const token = tokenStore.get()
    const location = useLocation()
    if(token == null)
        return <Navigate to="/login" replace state={{from : location}}></Navigate>
    return <Outlet/>
}