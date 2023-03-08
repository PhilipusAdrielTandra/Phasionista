import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <ul className="dashboard-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/profile"><img src="profile-icon.png" alt="Profile" /></Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;