import React from 'react'
import { Link, Navigate } from 'react-router-dom';


import "../Styles/Navbar.css";

function Navbar() {

  return (
    <nav className="nav">
        <div className="site-title">
            <Link to="/home" >Phasionista</Link>
        </div>
            <ul className='navbar'>
                <li><Link to="/home">Orders</Link></li>
                <li><Link to="/wishlist">Wishlist</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/profile"><img src="profile-icon.png" alt="Profile" /></Link></li>
            </ul>

    </nav>

  )
}

export default Navbar