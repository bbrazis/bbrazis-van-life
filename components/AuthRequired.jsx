import React from "react"
import { Outlet, Navigate, useLocation, redirect } from "react-router-dom"
import { getCookie } from "../api"

export default function AuthRequired() {
    const [loaded, setLoaded] = React.useState(false)
    const isLoggedIn = getCookie('login')
    const location = useLocation()
    
    React.useEffect(()=>{
        if(!loaded){
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
        setLoaded(true)
    },[loaded])

    return (
        <div className="loader" aria-live="assertive"></div>
    )
}