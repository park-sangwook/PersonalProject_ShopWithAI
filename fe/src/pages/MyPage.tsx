// src/pages/MyPage.tsx
import React from 'react';

const MyPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-1/4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">My Page</h2>
          <ul className="space-y-2">
            <li><a href="#" className="block py-2 px-3 bg-blue-100 text-blue-700 rounded">Order History</a></li>
            <li><a href="#" className="block py-2 px-3 hover:bg-gray-100 rounded">Profile</a></li>
            <li><a href="#" className="block py-2 px-3 hover:bg-gray-100 rounded">Addresses</a></li>
            <li><a href="#" className="block py-2 px-3 hover:bg-gray-100 rounded">Wishlist</a></li>
            <li><a href="#" className="block py-2 px-3 hover:bg-gray-100 rounded">My Reviews</a></li>
          </ul>
        </div>
      </aside>
      <main className="flex-1">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6">Order History</h3>
          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <p><strong>Order #12345</strong> - 2026-02-28</p>
                <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">Preparing</span>
              </div>
              <p>Total: ₩125,000</p>
              <div className="mt-4"><button className="text-sm text-white bg-gray-600 hover:bg-gray-700 py-1 px-3 rounded">Write a Review</button></div>
            </div>
            <div className="border rounded-lg p-4">
               <div className="flex justify-between items-center mb-2">
                 <p><strong>Order #12344</strong> - 2026-02-20</p>
                 <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Delivered</span>
               </div>
               <p>Total: ₩85,000</p>
               <div className="mt-4"><button className="text-sm text-white bg-gray-600 hover:bg-gray-700 py-1 px-3 rounded">Write a Review</button></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default MyPage;
