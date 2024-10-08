import React from "react"
import { Outlet, Navigate, useLocation, redirect } from "react-router-dom"
import { getCookie, checkAuth } from "../api"
import Loader from "./Loader"

export default function AuthRequired() {
    const [loading, setloading] = React.useState(true)
    // const [error, setError] = React.useState(null)
    const [verified, setVerified] = React.useState(false)
    const [tokenStatus, setTokenStatus] = React.useState(getCookie('login') || null)
    const location = useLocation()

    React.useEffect(()=> {
        if(tokenStatus != null){
            setVerified(true)
        }
        setloading(false)
    },[loading])

    if (loading){
        //Load state
        return <Loader />
    } else if (!verified) {
        // Not Verified state
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
    } else if (verified) {
        // Verified state
        return <Outlet />
    }
}