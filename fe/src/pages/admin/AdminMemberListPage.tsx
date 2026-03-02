// src/pages/admin/AdminMemberListPage.tsx
import React from 'react';

const AdminMemberListPage: React.FC = () => {
  const members = [
    { id: 1, name: '홍길동', email: 'hong@example.com', signupDate: '2026-02-15' },
    { id: 2, name: '김영희', email: 'kim@example.com', signupDate: '2026-02-10' },
  ];
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Member Management</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b"><th className="p-4">ID</th><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Signup Date</th><th className="p-4">Actions</th></tr>
          </thead>
          <tbody>
            {members.map(m => (
              <tr key={m.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{m.id}</td><td className="p-4">{m.name}</td><td className="p-4">{m.email}</td><td className="p-4">{m.signupDate}</td>
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
