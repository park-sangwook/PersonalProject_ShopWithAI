// src/pages/admin/AdminCategoryListPage.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/client';

const AdminCategoryListPage: React.FC = () => {
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['adminCategories'],
    queryFn: async () => {
      const response = await apiClient.get('/api/category/category_l');
      return response.data || [];
    },
  });

  if (isLoading) return <div className="text-center py-20 text-gray-500">Loading category list...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load categories.</div>;

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
            {categories.map((c: any) => (
              <tr key={c.id || c.seq} className="border-b hover:bg-gray-50">
                <td className="p-4">{c.code_id || c.seq}</td><td className="p-4">{c.name || c.code_name}</td>
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
