import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header(){
    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink to="host" className={({isActive}) => isActive ? 'link-active': null}>Host</NavLink>
                <NavLink to="about" className={({isActive}) => isActive ? 'link-active': null}>About</NavLink>
                <NavLink to="vans" className={({isActive}) => isActive ? 'link-active': null}>Vans</NavLink>
                <Link to="login" className="login-link">
                    <img
                        src={imageUrl}
                        alt="account icon"
                        className="login-icon"
                    />
                </Link>
                <button onClick={fakeLogOut}>X</button>
            </nav>
        </header>
    )
}