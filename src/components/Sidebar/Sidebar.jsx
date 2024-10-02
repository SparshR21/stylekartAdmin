import React, { useState } from 'react';
import './Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import add_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';

const Sidebar = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const correctPassword = process.env.REACT_APP_ADMIN_PASSWORD; // Access the password from .env

    const handlePasswordSubmit = (event, targetPath) => {
        event.preventDefault(); // Prevent the default form submission

        if (password === correctPassword) {
            setIsAuthenticated(true);
            navigate(targetPath); // Navigate to the desired route
        } else {
            alert('Incorrect password!'); // Alert for wrong password
        }

        setPassword(''); // Clear the password field
    };

    return (
        <div className='sidebar'>
            {/* Add Product Link */}
            <div className="sidebar-item" onClick={(event) => handlePasswordSubmit(event, '/addproduct')}>
                <img src={add_product_icon} alt="" />
                <p>Add Product</p>
            </div>

            {/* List Product Link */}
            <div className="sidebar-item" onClick={(event) => handlePasswordSubmit(event, '/listproduct')}>
                <img src={list_product_icon} alt="" />
                <p>Product List</p>
            </div>

            {/* Password Input Modal */}
            {!isAuthenticated && (
                <div className="password-modal">
                    <form onSubmit={(e) => handlePasswordSubmit(e)}>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
