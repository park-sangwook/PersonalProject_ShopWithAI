import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // 경로가 /api로 시작하면 아래 설정된 대상으로 전달
      '/api': {
        target: 'http://localhost:8081', // 스프링 부트 서버 주소
        // target: 'http://192.168.219.8:8081', // 스프링 부트 서버 주소
        changeOrigin: true,             // 대상 서버의 호스트 헤더 변경
        // rewrite: (path) => path.replace(/^\/api/, ''), // /api를 제거하고 전달
        secure: false,                  // SSL(https) 사용 시 false
      },
    },
  },
})
