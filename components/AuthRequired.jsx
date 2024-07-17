import React from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { getCookie } from "../api"

export default function AuthRequired() {
    const isLoggedIn = getCookie('login')
    const location = useLocation()
    console.log(location)
    if(!isLoggedIn) {
        return (
            <Navigate 
                to="/login" 
                state={{
                    message: "You must log in first",
                    from: location.pathname
                }} 
                replace
            />
        )
    } else {
        return <Outlet />
    }
}