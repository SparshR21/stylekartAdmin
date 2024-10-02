import React from 'react';
import './Navbar.css'; 
import logo from '../../assets/logo.png';
import navprofile from '../../assets/nav-profile.svg';
import { useAuth } from '../../AuthContext'; // Import useAuth

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Get isAuthenticated and logout function from context

  const handleLogout = () => {
    logout();
    window.location.href = '/'; // Redirect to home or login page
  };

  return (
    <div className='navbar'>
      <img src={logo} alt="" className="nav-logo" />
      <div className="nav-profile-container">
        <img src={navprofile} className='nav-profile' alt="" />
        {isAuthenticated && ( // Conditionally render the logout button
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
