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

    const vanElements = displayedVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link to={`/vans/${van.id}`}>
                <img src={van.imageUrl} alt={`${van.name} camped out in the wilderness`}/>
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))

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
                {vanElements}
            </div>
        </div>
    )
}