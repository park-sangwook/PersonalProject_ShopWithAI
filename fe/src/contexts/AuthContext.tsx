// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, type ReactNode } from 'react';
import apiClient from '@/api/client';

interface User {
  seq: number;
  id?: string;
  name: string;
  role: number;
}

interface IAuthContext {
  isLoggedIn: boolean;
  user: User | null;
  accessToken: string | null;
  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      return null;
    }
  });
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('accessToken');
  });

  const login = (userData: User, token: string) => {
    setUser(userData);
    setAccessToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', token);
  };

  const logout = async () => {
    try {
      // 서버에 로그아웃 요청 전송
      const response = await apiClient.post('/api/user/logout');
      
      // 백엔드에서 SUCCESS 응답이 왔을 경우에만 인증 흔적 삭제 및 리디렉션
      if (response && response.data === 'SUCCESS') {
        alert('로그아웃이 성공적으로 되었습니다.');

        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // 상태를 null로 변경(setUser 등)하면 리액트가 즉시 재렌더링되며 
        // AdminRoute의 useEffect가 발동해 '로그인이 필요합니다' 경고창을 띄우게 됩니다.
        // 어차피 window.location.href로 페이지를 새로고침하므로, 상태 업데이트를 생략하여 충돌을 방지합니다.
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout API failed:', error);
      // 실패 시 로컬 상태를 지우지 않습니다.
    }
  };

  const value = {
    isLoggedIn: !!accessToken,
    user,
    accessToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
