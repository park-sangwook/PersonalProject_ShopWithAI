// src/components/common/AdminRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminRoute: React.FC = () => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    // 사용자가 로그인하지 않았다면 로그인 페이지로 리디렉션
    alert('로그인이 필요합니다.');
    return <Navigate to="/login" />;
  }

  if (user?.role !== 2) {
    // 로그인했지만 관리자가 아니라면 홈페이지로 리디렉션
    alert('접근 권한이 없습니다.');
    return <Navigate to="/" />;
  }

  // 로그인한 관리자라면 요청된 페이지를 렌더링
  return <Outlet />;
};

export default AdminRoute;
