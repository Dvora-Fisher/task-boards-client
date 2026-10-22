import { Navigate, Outlet, useLocation } from "react-router-dom"

export function ProtectedRoute(){
    const token = localStorage.getItem('accessToken')
    const location = useLocation()
    if(token == null)
        return <Navigate to="/login" replace state={{from : location}}></Navigate>
    return <Outlet/>
}