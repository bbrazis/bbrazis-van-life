import React from 'react'

export default function Vans() {
    
    const [vans, setVans] = React.useState([])
    
    React.useEffect(()=>{
        fetch('/api/vans')
            .then(res => res.json())
            .then(data => setVans(data.vans))
    },[])
    
    const Van = ({imageUrl, name, price, type, id}) =>
        <div key={id} className="van-tile">
            <img src={imageUrl} alt={`a ${name} out somewhere`} />
            <div className="van-info">
                <h3>{name}</h3>
                <p>${price}<span>/day</span></p>
            </div>
            <i className={`van-type ${type} selected`}>{type}</i>
        </div>
    
    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list">
                {vans.length > 0 && vans.map(Van)}
            </div>
        </div>
    )
}