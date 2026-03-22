import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeliveryTrackingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">배송 조회 (데모)</h1>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <div className="border-b border-gray-100 pb-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">배송 정보</h2>
          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <div className="text-gray-500">운송장 번호</div>
            <div className="text-gray-900 font-medium">대한통운 1234-5678-9012</div>
            <div className="text-gray-500">주문 번호</div>
            <div className="text-gray-900 font-medium">20260310-123456</div>
            <div className="text-gray-500">배송지</div>
            <div className="text-gray-900 font-medium">서울특별시 강남구 테헤란로 123, 4층</div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-6">배송 진행 상황</h2>
          <div className="relative border-l-2 border-blue-200 ml-4 space-y-8">
            <div className="relative pl-8">
              <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[9px] top-1"></div>
              <p className="text-xs text-gray-400 mb-1">2026.03.11 14:30</p>
              <h4 className="text-md font-bold text-gray-900">배송 중</h4>
              <p className="text-sm text-gray-600 mt-1">강남 서초 영업소에서 배송을 출발했습니다. (배달예정시간: 16:00~18:00)</p>
            </div>
            <div className="relative pl-8">
              <div className="absolute w-4 h-4 bg-gray-300 rounded-full -left-[9px] top-1 border-2 border-white"></div>
              <p className="text-xs text-gray-400 mb-1">2026.03.11 08:15</p>
              <h4 className="text-md font-bold text-gray-700">배송지 도착</h4>
              <p className="text-sm text-gray-600 mt-1">상품이 배송지 관할 터미널에 도착했습니다.</p>
            </div>
            <div className="relative pl-8">
              <div className="absolute w-4 h-4 bg-gray-300 rounded-full -left-[9px] top-1 border-2 border-white"></div>
              <p className="text-xs text-gray-400 mb-1">2026.03.10 21:00</p>
              <h4 className="text-md font-bold text-gray-700">터미널 출발</h4>
              <p className="text-sm text-gray-600 mt-1">간선상차 완료 및 목적지로 이동 중입니다.</p>
            </div>
            <div className="relative pl-8">
              <div className="absolute w-4 h-4 bg-gray-300 rounded-full -left-[9px] top-1 border-2 border-white"></div>
              <p className="text-xs text-gray-400 mb-1">2026.03.10 16:40</p>
              <h4 className="text-md font-bold text-gray-700">상품 인수</h4>
              <p className="text-sm text-gray-600 mt-1">판매자로부터 상품을 인수받았습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTrackingPage;