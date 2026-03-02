// src/pages/QnaBoardPage.tsx
import React from 'react';

const QnaBoardPage: React.FC = () => {
  const qnaItems = [
    { id: 1, title: '배송 문의', author: '김**', date: '2026-03-01', status: 'Answered' },
    { id: 2, title: '상품 재입고 언제 되나요?', author: '이**', date: '2026-02-28', status: 'Pending' },
  ];
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Q&A Board</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Write a Question</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {qnaItems.map(item => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'Answered' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>{item.status}</span>
                </td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.author}</td>
                <td className="px-6 py-4">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default QnaBoardPage;
