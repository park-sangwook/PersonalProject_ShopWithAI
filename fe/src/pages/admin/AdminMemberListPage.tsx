// src/pages/admin/AdminMemberListPage.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/client';

const AdminMemberListPage: React.FC = () => {
  const { data: members = [], isLoading, error } = useQuery({
    queryKey: ['adminMembers'],
    queryFn: async () => {
      const response = await apiClient.get('/api/user/all');
      return response.data || [];
    },
  });

  if (isLoading) return <div className="text-center py-20 text-gray-500">Loading member list...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load members.</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Member Management</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b"><th className="p-4">ID</th><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Signup Date</th><th className="p-4">Actions</th></tr>
          </thead>
          <tbody>
            {members.map((m: any) => (
              <tr key={m.id || m.seq} className="border-b hover:bg-gray-50">
                <td className="p-4">{m.seq || m.id}</td>
                <td className="p-4">{m.name || m.userName || m.id}</td>
                <td className="p-4">{m.email || m.userEmail || '-'}</td>
                <td className="p-4">{m.signupDate || m.createdAt || m.regDate || '-'}</td>
                <td className="p-4"><button className="text-sm bg-gray-200 py-1 px-3 rounded">View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminMemberListPage;
