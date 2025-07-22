import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { FaBars } from 'react-icons/fa';
import { useBlogContext } from '../../../context/BlogContext';

const Layout = () => {
  const { axios, setToken } = useBlogContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // ✅ use it here directly

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    navigate('/'); // ✅ works properly
  };

  return (
    <div className="flex flex-col h-screen">

      {/* ✅ Topbar */}
      <div className="bg-blue-600 text-white flex items-center justify-between px-4 py-3 shadow-md z-10">
        <div className="flex items-center gap-4">
          <button className="block lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <FaBars size={22} />
          </button>
          <img
            src={assets.logo}
            alt="Logo"
            className="h-8 cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>
        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 text-sm rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* ✅ Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
