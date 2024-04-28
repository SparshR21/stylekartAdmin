import React from 'react'
import './Navbar.css' 
import logo from '../../assets/logo.png'
import navprofile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo} alt="" className="nav-logo" />
        <img src={navprofile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar