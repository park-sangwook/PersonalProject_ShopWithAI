// src/pages/admin/AdminOrderListPage.tsx
import React from 'react';

const AdminOrderListPage: React.FC = () => {
  const orders = [
    { id: '12345', date: '2026-03-02', customer: '홍길동', total: 125000, status: 'Preparing' },
    { id: '12344', date: '2026-03-01', customer: '김영희', total: 85000, status: 'Shipped' },
  ];
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Management</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b"><th className="p-4">Order ID</th><th className="p-4">Date</th><th className="p-4">Customer</th><th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{o.id}</td><td className="p-4">{o.date}</td><td className="p-4">{o.customer}</td><td className="p-4">₩{o.total.toLocaleString()}</td>
                <td className="p-4">
                  <select defaultValue={o.status} className="border rounded p-1">
                    <option>Preparing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option>
                  </select>
                </td>
                <td className="p-4"><button className="text-sm bg-gray-200 py-1 px-3 rounded">View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminOrderListPage;
