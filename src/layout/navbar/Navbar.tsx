import React from 'react'

import { Link } from 'react-router-dom'

import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar__items">
                <div className="navbar__logo">
                    <Link to="/">Charitify.</Link>
                </div>
                <ul className="navbar__links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about-us">About us</Link></li>
                    <li><Link to="/explore" className="explore">Explore</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
