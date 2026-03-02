// src/pages/admin/DashboardPage.tsx
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-gray-500">Today's Revenue</h4>
          <p className="text-3xl font-bold mt-2">₩1,200,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-gray-500">New Orders</h4>
          <p className="text-3xl font-bold mt-2">15</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-gray-500">New Members</h4>
          <p className="text-3xl font-bold mt-2">32</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-gray-500">Pending Q&A</h4>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>
      </div>
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Sales Statistics (Chart Placeholder)</h3>
        <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
          <p className="text-gray-500">Chart will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
