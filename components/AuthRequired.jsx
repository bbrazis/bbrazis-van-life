import React from "react"
import { Outlet, Navigate, useLocation, redirect } from "react-router-dom"
import { getCookie } from "../api"

export default function AuthRequired() {
    const [loaded, setLoaded] = React.useState(false)
    const isLoggedIn = getCookie('login')
    const location = useLocation()
    
    let output = 

    React.useEffect(()=> {
        setLoaded(true)
    },[loaded])

    return (
        <>
            { !loaded && <div className="loader" aria-live="assertive"></div> }
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