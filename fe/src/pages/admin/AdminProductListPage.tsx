// src/pages/admin/AdminProductListPage.tsx
import React from 'react';

const AdminProductListPage: React.FC = () => {
  const products = [
    { id: 1, name: '멋진 셔츠', category: 'Apparel', price: 50000, stock: 100 },
    { id: 2, name: '편안한 바지', category: 'Apparel', price: 70000, stock: 50 },
  ];
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
            {products.map(p => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{p.id}</td><td className="p-4">{p.name}</td><td className="p-4">{p.category}</td><td className="p-4">₩{p.price.toLocaleString()}</td><td className="p-4">{p.stock}</td>
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
