// src/App.tsx
import { Routes, Route, Link, useLocation } from 'react-router-dom';
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
  const isAdminRoute = location.pathname.startsWith('/admin');

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
                  <button className="text-gray-600 hover:text-blue-600 transition-colors">Categories</button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 invisible group-hover:visible z-20">
                    <Link to="/category/apparel" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Apparel</Link>
                    <Link to="/category/shoes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Shoes</Link>
                    <Link to="/category/accessories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Accessories</Link>
                  </div>
                </div>
                <div className="w-full max-w-sm">
                  <div className="relative">
                    <input type="text" placeholder="Search for products..." className="w-full pl-4 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                    </button>
                  </div>
                </div>
              </>
            )}
            {isAdminRoute && (
              <div className="text-gray-500 font-medium">Administrator Mode</div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn && !isAdminRoute && <Link to="/cart" className="text-gray-600 hover:text-blue-600 transition-colors">Cart</Link>}
            {isLoggedIn ? (
              <>
                {user?.role === 2 && (
                  <Link to="/admin/dashboard" className={`text-sm px-3 py-1 rounded-md ${isAdminRoute ? 'bg-gray-800 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Admin</Link>
                )}
                <Link to="/mypage" className="text-gray-600 hover:text-blue-600 transition-colors">My Page</Link>
                <button onClick={logout} className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">Login</Link>
                <Link to="/register" className="text-gray-600 hover:text-blue-600 transition-colors">Register</Link>
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
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/write-review/:id" element={<WriteReviewPage />} />
          <Route path="/write-qna/:id" element={<WriteQnaPage />} />
          <Route path="/qna" element={<QnaBoardPage />} />
          <Route path="/category/:name" element={<MainPage />} />

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

      {/* Footer (Hide on Admin Routes to save space, or keep it if desired) */}
      {!isAdminRoute && (
        <footer className="bg-gray-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm">
            <p>&copy; 2026 DemoShop. All rights reserved. | <Link to="/qna" className="hover:underline">Q&A Board</Link> | <Link to="/admin/dashboard" className="hover:underline">Admin</Link></p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;