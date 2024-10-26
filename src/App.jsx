// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Admin from './pages/Admin/Admin.jsx';
import { AuthProvider, useAuth } from './AuthContext';

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
    };

    // Define styles for input fields and button
    const inputStyle = {
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '250px', // Width of input fields
    };

    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#4CAF50', // Green button
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '260px', // Width of the button
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={inputStyle} // Apply input styles
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle} // Apply input styles
            />
            <button type="submit" style={buttonStyle}>Login</button> {/* Apply button styles */}
        </form>
    );
};

const App = () => {
    const { isAuthenticated } = useAuth(); // Use useAuth to access authentication state

    return (
        <div>
            <Navbar />
            {isAuthenticated ? <Admin /> : <Login />}
        </div>
    );
};

// Wrap App component with AuthProvider
const WrappedApp = () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);

export default WrappedApp;
