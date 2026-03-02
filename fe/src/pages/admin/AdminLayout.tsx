// src/pages/admin/AdminLayout.tsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          <NavLink to="/admin/dashboard" className={({ isActive }) => `block py-2.5 px-6 transition duration-200 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}>Dashboard</NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => `block py-2.5 px-6 transition duration-200 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}>Products</NavLink>
          <NavLink to="/admin/categories" className={({ isActive }) => `block py-2.5 px-6 transition duration-200 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}>Categories</NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => `block py-2.5 px-6 transition duration-200 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}>Orders</NavLink>
          <NavLink to="/admin/members" className={({ isActive }) => `block py-2.5 px-6 transition duration-200 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}>Members</NavLink>
          <NavLink to="/admin/reviews" className={({ isActive }) => `block py-2.5 px-6 transition duration-200 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}>Reviews & Q&A</NavLink>
          <NavLink to="/admin/events" className={({ isActive }) => `block py-2.5 px-6 transition duration-200 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}>Events & Coupons</NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
