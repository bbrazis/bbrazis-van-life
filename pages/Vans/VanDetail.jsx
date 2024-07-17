import React from 'react'
import { useParams } from 'react-router-dom'
import { getVans } from '../../api'

export default function VanDetail() {
    const params = useParams()
    const [van, setVan] = React.useState(null)

    React.useEffect(()=>{
        getVans(params.id)
            .then(data => setVan(data))
    },[params.id])

    return (
        <div className="van-detail-container">
            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} alt={`a picture of ${van.name}`} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h1>{van.name}</h1>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h1>Loading...</h1>}
        </div>
    )
}