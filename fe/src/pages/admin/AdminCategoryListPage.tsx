// src/pages/admin/AdminCategoryListPage.tsx
import React from 'react';

const AdminCategoryListPage: React.FC = () => {
  const categories = [{ id: 1, name: 'Apparel' }, { id: 2, name: 'Shoes' }, { id: 3, name: 'Accessories' }];
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Add New Category</button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full text-left">
           <thead>
            <tr className="border-b"><th className="p-4">ID</th><th className="p-4">Name</th><th className="p-4">Actions</th></tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{c.id}</td><td className="p-4">{c.name}</td>
                <td className="p-4 space-x-2"><button className="text-sm bg-gray-200 py-1 px-3 rounded">Edit</button><button className="text-sm bg-red-500 text-white py-1 px-3 rounded">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminCategoryListPage;
