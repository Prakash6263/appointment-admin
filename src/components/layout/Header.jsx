'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header({ onToggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="p-0">
      <div className="header-inner">
        <div className="page-title">
          <button
            id="toggleBtn"
            className="btn btn-outline-secondary me-2 bg-transparent"
            aria-label="Toggle sidebar"
            onClick={onToggleSidebar}
          >
            ☰
          </button>
          <h4 className="mb-0">Admin Panel</h4>
        </div>
        <div className="header-actions d-flex align-items-center">
          <div className="dropdown" ref={dropdownRef}>
            <a
              href="#"
              className="d-flex align-items-center text-decoration-none dropdown-toggle"
              id="userDropdown"
              onClick={(e) => {
                e.preventDefault();
                setDropdownOpen(!dropdownOpen);
              }}
              aria-expanded={dropdownOpen}
            >
              <span className="me-2 d-none d-md-inline text-muted small">
                {user?.email || 'Admin'}
              </span>
              <img src="/assets/images/avatar.svg" alt="avatar" className="avatar rounded-circle" />
            </a>
            <ul
              className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}
              aria-labelledby="userDropdown"
            >
              <li>
                <button 
                  type="button"
                  onClick={handleLogout} 
                  className="dropdown-item text-danger"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
