import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [vans, setVans] = React.useState([])
    
    const typeFilter = searchParams.get("type")

    React.useEffect(()=>{
        fetch('/api/vans')
            .then(res => res.json())
            .then(data => setVans(data.vans))
    },[])

    const displayedVans = typeFilter
        ? vans.filter(van => van.type === typeFilter)
        : vans
    
    const Van = ({imageUrl, name, price, type, id}) =>
        <div key={id} className="van-tile">
            <Link 
                to={`/vans/${id}`}
                aria-label={`View details for ${name}, priced at $${price} per day`}
            >
                <img src={imageUrl} alt={`a ${name} out somewhere`} />
                <div className="van-info">
                    <p className='van-title'>{name}</p>
                    <p>${price}<span>/day</span></p>
                </div>
                <i className={`van-type ${type} selected`}>{type}</i>
            </Link>
        </div>
    
    const vanEl = displayedVans.map(Van)

    function searchFor(key, value){
        const obj = { key: value }
        setSearchParams(obj)
    }

    function clearSearch() {
        setSearchParams({})
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button className="van-type simple" onClick={() => searchFor("type","simple")}>Simple</button>
                <button className="van-type luxury" onClick={() => searchFor("type","luxury")}>Luxury</button>
                <button className="van-type rugged" onClick={() => searchFor("type","rugged")}>Rugged</button>
                <button className="van-type clear-filters" onClick={() => clearSearch()}>Clear filter</button>
            </div>
            <div className="van-list">
                {displayedVans.length > 0 && vanEl}
            </div>
        </div>
    )
}