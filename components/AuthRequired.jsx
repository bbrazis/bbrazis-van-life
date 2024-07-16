import React from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { checkAuth, getCookie } from "../api"

export default function AuthRequired() {
    const [loading, setLoading] = React.useState(true)

    async function getStatus() {
        const isLoggedIn = await checkAuth()
        const location = useLocation()

        if(!isLoggedIn) {
            setLoading(false)
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
            setLoading(false)
            return <Outlet />
        }
    }

    React.useEffect(()=> {
        getStatus()
    },[loading])

    return (
        <>
            { loading && <h1>Loading</h1>  }
        </>
    )
}