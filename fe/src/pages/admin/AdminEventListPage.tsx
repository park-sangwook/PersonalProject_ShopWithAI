// src/pages/admin/AdminEventListPage.tsx
import React from 'react';

const AdminEventListPage: React.FC = () => {
  const events = [
    { id: 1, title: '봄맞이 세일', status: 'Active' },
    { id: 2, title: '신규회원 쿠폰', status: 'Active' },
  ];
  return (
    <div>
       <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Events & Coupons</h1>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Create New</button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
         <table className="w-full text-left">
           <thead>
            <tr className="border-b"><th className="p-4">ID</th><th className="p-4">Title</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr>
          </thead>
          <tbody>
            {events.map(e => (
              <tr key={e.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{e.id}</td><td className="p-4">{e.title}</td><td className="p-4">{e.status}</td>
                <td className="p-4 space-x-2"><button className="text-sm bg-gray-200 py-1 px-3 rounded">Edit</button><button className="text-sm bg-red-500 text-white py-1 px-3 rounded">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminEventListPage;
