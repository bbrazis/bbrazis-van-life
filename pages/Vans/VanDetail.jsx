import React from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { getVans } from '../../api'
import Loader from '../../components/Loader'

export default function VanDetail() {
    const [van, setVan] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const { id } = useParams()
    const location = useLocation()
    const search = location.state?.search || ""
    const type = location.state?.type || "all"

    React.useEffect(()=>{
        async function loadVans(){
            setLoading(true)
            try {
                const data = await getVans(id)
                setVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        
        loadVans
    },[id])

    if(loading) {
        return (
            <section>
                <Loader />
            </section>
        )
    }

    if(error) {
        return (
            <section>
                <h1>There was an error: {error.message}</h1>
            </section>
        )
    }
    
    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative='path'
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>

            {van && (
                <div className="van-detail">
                    <img src={van.imageUrl} alt={`a picture of ${van.name}`} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h1>{van.name}</h1>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            )}
        </div>
    )
}