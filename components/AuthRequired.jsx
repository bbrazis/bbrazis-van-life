import React from "react"
import { Outlet, Navigate, useLocation, redirect } from "react-router-dom"
import { getCookie, checkAuth } from "../api"
import Loader from "./Loader"

export default function AuthRequired() {
    const [loading, setloading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [verified, setVerified] = React.useState(false)
    const isLoggedIn = getCookie('login') || null
    const location = useLocation()

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    React.useEffect(()=> {
        async function checkLogin(){
            setloading(true)
            try {
                const data = await checkAuth()
                timeout(500)
                if(data?.loggedIn){
                    console.log('user is logged in, continue: ', data)
                    setVerified(true)
                } else{
                    console.log('user not logged in, go to login: ', data)
                }
            } catch(err) {
                setError(err)
            } finally {
                setloading(false)
            }
        }

        checkLogin()
    },[])

    //Load state
    if(!loading){
        return <Loader />
    }

    //Error State and send to login
    if(error){
        console.log(`There was an error: ${error}`)
        return (
            <Navigate
                to="login"
                state={{
                    message: "There was an error with your login, please try again.",
                    from: location.pathname
                }}
                replace
            />
        )
    }

    //No Error, but not verified send to login
    if(!verified) {
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
    }

    // Verified and may continue
    return <Outlet />
}