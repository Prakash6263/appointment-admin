'use client';

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav id="sidebar" className="sidebar text-white">
      <div className="sidebar-header p-3 d-flex align-items-center">
       <img src="/assets/images/logo.png"  style={{ width: '150px' }} />
      </div>
      <ul className="nav flex-column px-2 pt-3">
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/dashboard">
            <i className="fa fa-home"></i> Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/partners">
            <i className="fa fa-users"></i> Service Partners
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/membership">
            <i className="fa fa-id-card"></i> Membership Plans
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/payments">
            <i className="fa fa-credit-card"></i> Payments
          </NavLink>
        </li>
        <li className="nav-item mt-3">
          <button 
            onClick={handleLogout}
            className="nav-link text-white bg-transparent border-0 w-100 text-start"
            style={{ cursor: 'pointer' }}
          >
            <i className="fa fa-sign-in-alt"></i>
            <span className="nav-text">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
