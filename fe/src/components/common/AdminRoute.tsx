// src/components/common/AdminRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminRoute: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState<string | null>(null);
  console.log(user);

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      setShouldRedirect('/login');
    } else if (Number(user?.role) !== 2) {
      alert('접근 권한이 없습니다.');
      setShouldRedirect('/');
    }
  }, [isLoggedIn, user]);

  if (shouldRedirect) {
    return <Navigate to={shouldRedirect} replace />;
  }

  if (!isLoggedIn || Number(user?.role) !== 2) {
    return null; // 리디렉션 처리 중 깜빡임 방지
  }

  // 로그인한 관리자라면 요청된 페이지를 렌더링
  return <Outlet />;
};

export default AdminRoute;
