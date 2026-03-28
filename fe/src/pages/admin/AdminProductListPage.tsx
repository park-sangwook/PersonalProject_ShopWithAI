// src/pages/admin/AdminProductListPage.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/client';

const AdminProductListPage: React.FC = () => {
  // useQuery를 사용하여 관리자용 상품 목록 페칭 (캐싱 적용)
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['adminProducts'],
    queryFn: async () => {
      const response = await apiClient.get('/api/product/all');
      return response.data || [];
    },
  });

  if (isLoading) return <div className="text-center py-20 text-gray-500">Loading product list...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load products.</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Add New Product</button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4">ID</th><th className="p-4">Name</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4">Stock</th><th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: any) => (
              <tr key={p.id || p.seq || p.productId} className="border-b hover:bg-gray-50">
                <td className="p-4">{p.id || p.seq || p.productId}</td>
                <td className="p-4">{p.name || p.productName}</td>
                <td className="p-4">{p.category || p.category_l || p.categoryL}</td>
                <td className="p-4">₩{(p.price || 0).toLocaleString()}</td>
                <td className="p-4">{p.stock || p.productStock || 0}</td>
                <td className="p-4 space-x-2"><button className="text-sm bg-gray-200 py-1 px-3 rounded">Edit</button><button className="text-sm bg-red-500 text-white py-1 px-3 rounded">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminProductListPage;
