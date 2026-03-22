// src/App.tsx
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import apiClient from '@/api/client';
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import CartPage from '@/pages/CartPage';
import MyPage from '@/pages/MyPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CheckoutPage from '@/pages/CheckoutPage';
import QnaBoardPage from '@/pages/QnaBoardPage';
import WriteReviewPage from '@/pages/WriteReviewPage';
import WriteQnaPage from '@/pages/WriteQnaPage';
import AdminLayout from '@/pages/admin/AdminLayout';
import DashboardPage from '@/pages/admin/DashboardPage';
import AdminProductListPage from '@/pages/admin/AdminProductListPage';
import AdminOrderListPage from '@/pages/admin/AdminOrderListPage';
import AdminCategoryListPage from '@/pages/admin/AdminCategoryListPage';
import AdminMemberListPage from '@/pages/admin/AdminMemberListPage';
import AdminReviewListPage from '@/pages/admin/AdminReviewListPage';
import AdminEventListPage from '@/pages/admin/AdminEventListPage';
import { useAuth } from '@/contexts/AuthContext';
import AdminRoute from '@/components/common/AdminRoute';

function App() {
  const { isLoggedIn, logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (location.pathname.startsWith('/search/')) {
      const queryFromUrl = location.pathname.split('/search/')[1];
      if (queryFromUrl) {
        setSearchQuery(decodeURIComponent(queryFromUrl));
      }
    } else {
      setSearchQuery('');
    }
  }, [location.pathname]);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiClient.get('/api/category/category_l');
      return response.data || [];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery.trim()}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Global Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">DemoShop</Link>
          
          <div className="flex-1 flex justify-center px-4 items-center">
            {!isAdminRoute && (
              <>
                <div className="relative group mx-2">
                  <Link to="/product/all" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">카테고리</Link>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 invisible group-hover:visible z-20 border border-gray-100">
                    {categories.map((category: any) => (
                      <Link key={category.code_id} to={`/category/${category.code_id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        {category.code_name}
                      </Link>
                    ))}
                  </div>
                </div>
                <form onSubmit={handleSearch} className="w-full max-w-sm">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search for products..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-4 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 border-gray-200" 
                    />
                    <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-blue-600">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                    </button>
                  </div>
                </form>
              </>
            )}
            {isAdminRoute && (
              <div className="text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full text-sm">Administrator Mode</div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn && !isAdminRoute && (
              <Link to="/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </Link>
            )}
            {isLoggedIn ? (
              <>
                {user?.role === 2 && (
                  <Link to="/admin/dashboard" className={`text-sm px-3 py-1 rounded-md ${isAdminRoute ? 'bg-gray-800 text-white' : 'text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>Admin</Link>
                )}
                <Link to="/mypage" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">My Page</Link>
                <button onClick={logout} className="px-4 py-1.5 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-colors shadow-sm">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Login</Link>
                <Link to="/register" className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">Register</Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className={`flex-grow ${isAdminRoute ? '' : 'container mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/product/all" element={<MainPage isAllProducts={true} />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/write-review/:id" element={<WriteReviewPage />} />
          <Route path="/write-qna/:id" element={<WriteQnaPage />} />
          <Route path="/qna" element={<QnaBoardPage />} />
          <Route path="/category/:categoryId" element={<MainPage />} />
          <Route path="/search/:query" element={<MainPage />} />

          {/* Admin Routes (Integrated) */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="products" element={<AdminProductListPage />} />
              <Route path="orders" element={<AdminOrderListPage />} />
              <Route path="categories" element={<AdminCategoryListPage />} />
              <Route path="members" element={<AdminMemberListPage />} />
              <Route path="reviews" element={<AdminReviewListPage />} />
              <Route path="events" element={<AdminEventListPage />} />
            </Route>
          </Route>
        </Routes>
      </main>

      {/* Footer */}
      {!isAdminRoute && (
        <footer className="bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <Link to="/" className="text-xl font-bold text-gray-900">DemoShop</Link>
                <p className="mt-4 text-gray-500 max-w-xs text-sm leading-relaxed">
                  Best quality products for your lifestyle. Discover our new arrivals and special offers.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><Link to="/qna" className="hover:text-blue-600">Q&A Board</Link></li>
                  <li><Link to="/mypage" className="hover:text-blue-600">My Page</Link></li>
                  <li><Link to="/cart" className="hover:text-blue-600">Shopping Cart</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Admin</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><Link to="/admin/dashboard" className="hover:text-blue-600">Admin Dashboard</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
              <p>&copy; 2026 DemoShop. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;