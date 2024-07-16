import React from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { checkAuth } from "../api"

export default async function AuthRequired() {
    const isLoggedIn = await checkAuth()
    const location = useLocation()
    console.log(await isLoggedIn)
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