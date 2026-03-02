// src/pages/admin/AdminReviewListPage.tsx
import React from 'react';

const AdminReviewListPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Review & Q&A Management</h1>
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        {/* Review Table Placeholder */}
        <p className="text-gray-500">Review management table will be here.</p>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Q&A</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Q&A Table Placeholder */}
        <p className="text-gray-500">Q&A management table will be here.</p>
      </div>
    </div>
  );
};
export default AdminReviewListPage;
