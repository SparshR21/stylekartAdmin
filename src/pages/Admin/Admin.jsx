import React from 'react';
import './Admin.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddProduct from '../../components/AddProduct/AddProduct';
import ListProduct from '../../components/ListProduct/ListProduct';
import { useAuth } from '../../AuthContext';

const Admin = () => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login or another route
  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect to login or main page
  }

  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/listProduct' element={<ListProduct />} />
      </Routes>
    </div>
  );
}

export default Admin;
