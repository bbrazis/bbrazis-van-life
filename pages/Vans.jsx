import React from 'react'

export default function Vans() {
    
    const [vans, setVans] = React.useState([])
    
    React.useEffect(()=>{
        fetch('/api/vans')
            .then(res => res.json())
            .then(data => setVans(data.vans))
    },[])
    
    const Van = ({imageUrl, name, price, type}) =>
        <div className="van-item" key={name}>
            <img src={imageUrl} alt={name} className="van-image"/>
            <h2>{name}</h2>
            <div className="van-price-wrap">
                <p>${price}</p>
                <p>/day</p>
            </div>
            <p className="van-type">{type}</p>
        </div>
    
    return (
        <main>
        <h1>Vans page goes here 🚐</h1>
        <div className="van-grid">
            {vans.length > 0 && vans.map(Van)}
        </div>
        </main>
    )
}