import React from 'react'
import { checkAuth } from '../../api'
import Loader from '../../components/Loader'

export default function Dashboard() {
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    React.useEffect(()=>{
        async function checkAuthorization(){
            setLoading(true)
            try {
                const data = await checkAuth()
                console.log(data)
            } catch(err){
                setError(err)
            } finally {
                setLoading(false)
            }
        }
    },[])

    if(loading) {
        return (
            <section>
                <Loader />
            </section>
        )
    }

    if(error){
        return (
            <Navigate 
                to="/login" 
                state={{
                    message: `${error}`,
                    from: location.pathname
                }} 
                replace
            />
        )
    }

    return (
        <h1>Dashboard goes here</h1>
    )
}