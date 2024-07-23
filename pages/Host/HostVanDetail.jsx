import React from "react"
import { useParams, Link, Outlet, NavLink } from "react-router-dom"
import { getHostVans } from "../../api"
import Loader from "../../components/Loader"

export default function HostVanDetail() {
    const { id } = useParams()
    const [currentVan, setCurrentVan] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const activeStyles = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616'
    }

    React.useEffect(() => {
        async function loadVan() {
            setLoading(true)
            try {
                const data = await getHostVans(Number(id))
                console.log(data)
                setCurrentVan(data)
            } catch(err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        
        loadVan()
    }, [])

    if (loading) {
        return (
            <section className="loader-box">
                <Loader />
            </section>
        )
    }

    if (error) {
        return (
            <section>
                <h1>There was an error: {error.message}</h1>
            </section>
        )
    }
    
    return (
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>

            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    {   currentVan &&
                        <>
                            <img src={currentVan.imageUrl} alt={`an image of ${currentVan.type}`} />
                            <div className="host-van-detail-info-text">
                                <i
                                    className={`van-type van-type-${currentVan.type}`}
                                >
                                    {currentVan.type}
                                </i>
                                <h3>{currentVan.type}</h3>
                                <h4>${currentVan.price}/day</h4>
                            </div>
                        </>
                    }
                </div>
                <nav className="host-van-detail-nav">
                    <NavLink
                        to="."
                        end
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Details
                    </NavLink>
                    <NavLink
                        to="pricing"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Pricing
                    </NavLink>
                    <NavLink
                        to="photos"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Photos
                    </NavLink>
                </nav>
                <Outlet context={{ currentVan }} />
            </div>
        </section>
    )
}
