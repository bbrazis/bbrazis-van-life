import React from "react"
import { Outlet, Navigate, useLocation, redirect } from "react-router-dom"
import { getCookie } from "../api"
import Loader from "./Loader"

export default function AuthRequired() {
    const [loaded, setLoaded] = React.useState(false)
    const isLoggedIn = getCookie('login')
    const location = useLocation()

    React.useEffect(()=> {
        setTimeout(setLoaded(true), 500)
    },[loaded])

    return (
        <>
            { !loaded && <Loader /> }
            { loaded && !isLoggedIn ? (
                    <Navigate 
                        to="/login" 
                        state={{
                            message: "You must log in first",
                            from: location.pathname
                        }} 
                        replace
                    />
                ) : <Outlet />
            }
        </>
    )
}