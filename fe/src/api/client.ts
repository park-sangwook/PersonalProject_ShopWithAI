import axios, { type AxiosResponse } from 'axios';

// 백엔드 공통 응답 구조 정의
interface ApiResponse<T = any> {
  result: 'SUCCESS' | 'FAILED';
  errorMessage?: string;
  data?: T;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: '/api/user'로 시작하는 요청과 health-check 자체 요청을 제외한 모든 요청 전에 세션 확인
apiClient.interceptors.request.use(
  async (config) => {
    // Add Authorization header
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const userPaths = ['/api/user', '/api/product', '/api/auth'];

    // 배열 중 하나라도 조건(startsWith)에 맞으면 true 반환
    const isUserApi = config.url && userPaths.some(path => config.url.startsWith(path));
    const isHealthCheckApi = config.url === '/api/comm/health-check';

    if (isUserApi || isHealthCheckApi) {
      return config;
    }

    try {
      // Health check already has the token from the logic above
      const { data } = await apiClient.get<ApiResponse>('/api/comm/health-check');

      if (data.result === 'FAILED') {
        if (window.confirm('세션이 만료되었습니다.\\n로그인하시겠습니까?')) {
          window.location.href = '/login';
        }
        // 원래 요청 취소
        return Promise.reject(new Error('Session expired'));
      }
      // 세션이 유효하면 원래 요청 계속 진행
      return config;
    } catch (error) {
      console.error('Health check request failed:', error);
      if (window.confirm('세션 확인 중 오류가 발생했습니다.\n로그인하시겠습니까?')) {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);


// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // 1. HTTP 상태 코드가 200번대여도 비즈니스 로직상 'FAILED'인 경우 처리
    if (response.data && response.data.result === 'FAILED') {
      const errorMsg = response.data.errorMessage || '알 수 없는 오류가 발생했습니다.';
      alert(errorMsg);
      return Promise.reject(new Error(errorMsg));
    }
    return response;
  },
  (error) => {
    // 2. HTTP 에러(400, 500번대 등) 발생 시 처리
    let errorMsg = '서버와의 통신 중 오류가 발생했습니다.';
    console.log(error.response.data);

    if (error.response.data.errorMessage) {
      // 백엔드에서 보낸 customErrorMessage가 있는 경우 해당 메시지 사용
      errorMsg = error.response.data.errorMessage;
    } else if (error.message === 'Session expired') {
		// 세션 만료로 인한 요청 취소는 별도 팝업을 띄우지 않음
		return Promise.reject(error);
	}

    alert(errorMsg);
    return Promise.reject(error);
  }
);

export default apiClient;
