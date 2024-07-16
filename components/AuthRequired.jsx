import React from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { checkAuth, getCookie } from "../api"

export default async function AuthRequired() {
    const isLoggedIn = getCookie('login')
    const location = useLocation()
    
    if (!isLoggedIn) {
        return (
            <Navigate 
                to="/login" 
                state={{
                    message: "You must log in first",
                    from: location.pathname
                }} 
                replace
            />)
    }

    return <Outlet />
}