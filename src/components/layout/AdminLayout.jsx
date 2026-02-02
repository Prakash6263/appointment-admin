'use client';

import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

function AdminLayout() {
  const [sidebarHidden, setSidebarHidden] = useState(() => {
    try {
      return localStorage.getItem('cv_admin_sidebar_hidden') === '1';
    } catch {
      return false;
    }
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('cv_admin_sidebar_hidden', sidebarHidden ? '1' : '0');
    } catch {}
  }, [sidebarHidden]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('admin-overlay');
    } else {
      document.body.classList.remove('admin-overlay');
    }
    return () => document.body.classList.remove('admin-overlay');
  }, [sidebarOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 992) {
        setSidebarOpen(false);
        document.body.classList.remove('admin-overlay');
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    if (window.innerWidth >= 992) {
      setSidebarHidden(!sidebarHidden);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const handleOverlayClick = (e) => {
    if (window.innerWidth < 992 && sidebarOpen) {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(e.target)) {
        setSidebarOpen(false);
      }
    }
  };

  const appClasses = [
    'admin-app',
    'd-flex',
    sidebarHidden ? 'sidebar-hidden' : '',
    sidebarOpen ? 'sidebar-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={appClasses} onClick={handleOverlayClick}>
      <Sidebar />
      <div className="content w-100">
        <Header onToggleSidebar={handleToggleSidebar} />
        <main className="p-3">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;
