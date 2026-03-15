// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import { AuthProvider } from '@/contexts/AuthContext'; // Import AuthProvider
import './index.css';

// 시니어 개발자의 제안대로 최적화된 QueryClient 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분 (데이터를 5분간 fresh하게 유지)
      gcTime: 1000 * 60 * 10,   // 10분 (사용하지 않는 캐시는 10분 후 삭제)
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 재요청 방지
      refetchOnMount: false,       // 컴포넌트 마운트 시 자동 재요청 방지
      refetchOnReconnect: false,   // 네트워크 재연결 시 자동 재요청 방지
    },
  },
});

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider> {/* Wrap App with AuthProvider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
  // </StrictMode>
);
