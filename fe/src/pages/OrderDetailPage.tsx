import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const OrderDetailPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">주문 상세내역 (데모)</h1>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <div>
            <span className="text-sm text-gray-500 mr-2">주문번호</span>
            <span className="font-bold text-gray-900">20260310-123456</span>
          </div>
          <div>
            <span className="text-sm text-gray-500 mr-2">주문일자</span>
            <span className="font-bold text-gray-900">2026.03.10 13:45</span>
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-4">주문 상품</h2>
        <div className="border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-6">
            <img src="https://via.placeholder.com/150/e2e8f0/475569?text=Shirt" alt="Product" className="w-24 h-24 object-cover rounded-md" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-md">배송중</span>
              </div>
              <h4 className="text-lg font-medium text-gray-800">프리미엄 코튼 오버핏 셔츠</h4>
              <p className="text-gray-500 text-sm mt-1">옵션: 블랙 / L | 1개</p>
              <p className="font-bold text-gray-900 mt-2">50,000원</p>
            </div>
            <div className="flex flex-col gap-2 w-32">
              <Link to="/delivery-tracking" className="text-sm bg-gray-800 text-white hover:bg-gray-900 py-2 rounded transition-colors text-center">배송조회</Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">배송지 정보</h2>
            <div className="space-y-3 text-sm">
              <div className="flex">
                <span className="w-24 text-gray-500">수령인</span>
                <span className="font-medium text-gray-900">홍길동</span>
              </div>
              <div className="flex">
                <span className="w-24 text-gray-500">연락처</span>
                <span className="font-medium text-gray-900">010-1234-5678</span>
              </div>
              <div className="flex">
                <span className="w-24 text-gray-500">배송지</span>
                <span className="font-medium text-gray-900">서울특별시 강남구 테헤란로 123, 4층</span>
              </div>
              <div className="flex">
                <span className="w-24 text-gray-500">배송메모</span>
                <span className="font-medium text-gray-900">문 앞에 두고 가주세요.</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">결제 정보</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">상품 금액</span>
                <span className="font-medium text-gray-900">50,000원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">배송비</span>
                <span className="font-medium text-gray-900">3,000원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">할인 금액</span>
                <span className="font-medium text-red-500">-5,000원</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3 mt-3">
                <span className="font-bold text-gray-800">총 결제 금액</span>
                <span className="font-bold text-blue-600 text-lg">48,000원</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-gray-500">결제 수단</span>
                <span className="font-medium text-gray-900">신용카드 (현대)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;