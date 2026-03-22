import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto py-8">
      <aside className="lg:w-1/4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
              홍
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">홍길동님</h2>
              <p className="text-sm text-gray-500">VIP 회원</p>
            </div>
          </div>
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left py-3 px-4 rounded-md transition-colors ${activeTab === 'orders' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50 text-gray-700'}`}
              >
                주문/배송 조회
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('returns')}
                className={`w-full text-left py-3 px-4 rounded-md transition-colors ${activeTab === 'returns' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50 text-gray-700'}`}
              >
                취소/교환/반품
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('coupons')}
                className={`w-full text-left py-3 px-4 rounded-md transition-colors ${activeTab === 'coupons' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50 text-gray-700'}`}
              >
                쿠폰/포인트
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`w-full text-left py-3 px-4 rounded-md transition-colors ${activeTab === 'reviews' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50 text-gray-700'}`}
              >
                나의 리뷰
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left py-3 px-4 rounded-md transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50 text-gray-700'}`}
              >
                회원 정보 수정
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <main className="flex-1 space-y-8">
        {/* 쿠폰 및 포인트 현황 (항상 표시) */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('coupons')}>
            <p className="text-sm text-gray-500 mb-2">사용가능 쿠폰</p>
            <p className="text-2xl font-bold text-blue-600">3<span className="text-base text-gray-800 font-normal ml-1">장</span></p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('coupons')}>
            <p className="text-sm text-gray-500 mb-2">적립금</p>
            <p className="text-2xl font-bold text-blue-600">12,500<span className="text-base text-gray-800 font-normal ml-1">원</span></p>
          </div>
          <Link to="/cart" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center cursor-pointer hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-500 mb-2">장바구니</p>
            <p className="text-2xl font-bold text-blue-600">2<span className="text-base text-gray-800 font-normal ml-1">개</span></p>
          </Link>
        </div>

        {/* 탭 내용 렌더링 */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 min-h-[500px]">
          
          {/* 주문/배송 조회 */}
          {activeTab === 'orders' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">최근 주문내역</h3>
                <span className="text-sm text-gray-500">최근 3개월</span>
              </div>
              <div className="space-y-6">
                {/* 주문 1 */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                    <p className="font-medium text-gray-800">2026.03.10 주문 <span className="text-gray-400 text-sm ml-2">(주문번호: 20260310-123456)</span></p>
                    <a href="#" className="text-sm text-blue-600 hover:underline">상세보기</a>
                  </div>
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
                      <button className="text-sm bg-gray-800 text-white hover:bg-gray-900 py-2 rounded transition-colors">배송조회</button>
                      <button className="text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 rounded transition-colors" onClick={() => setActiveTab('returns')}>취소/교환/반품</button>
                    </div>
                  </div>
                </div>

                {/* 주문 2 */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                    <p className="font-medium text-gray-800">2026.03.01 주문 <span className="text-gray-400 text-sm ml-2">(주문번호: 20260301-987654)</span></p>
                    <a href="#" className="text-sm text-blue-600 hover:underline">상세보기</a>
                  </div>
                  <div className="flex items-center gap-6">
                    <img src="https://via.placeholder.com/150/e2e8f0/475569?text=Pants" alt="Product" className="w-24 h-24 object-cover rounded-md" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-md">구매확정</span>
                      </div>
                      <h4 className="text-lg font-medium text-gray-800">컴포트 와이드 데님 팬츠</h4>
                      <p className="text-gray-500 text-sm mt-1">옵션: 연청 / M | 2개</p>
                      <p className="font-bold text-gray-900 mt-2">118,000원</p>
                    </div>
                    <div className="flex flex-col gap-2 w-32">
                      <button className="text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 rounded transition-colors" onClick={() => setActiveTab('reviews')}>리뷰 작성</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 취소/교환/반품 */}
          {activeTab === 'returns' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">취소/교환/반품 내역</h3>
                <span className="text-sm text-gray-500">최근 3개월</span>
              </div>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                    <p className="font-medium text-gray-800">2026.02.15 접수 <span className="text-gray-400 text-sm ml-2">(주문번호: 20260210-456789)</span></p>
                    <span className="text-sm text-red-500 font-medium">반품완료</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <img src="https://via.placeholder.com/150/e2e8f0/475569?text=Jacket" alt="Product" className="w-24 h-24 object-cover rounded-md opacity-75" />
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-800">베이직 테일러드 자켓</h4>
                      <p className="text-gray-500 text-sm mt-1">옵션: 네이비 / L | 1개</p>
                      <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded">사유: 단순 변심 (사이즈 안맞음)</p>
                      <p className="font-bold text-gray-900 mt-2">환불금액: 85,000원</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                <ul className="list-disc list-inside space-y-1">
                  <li>취소/교환/반품 신청은 배송완료 후 7일 이내에만 가능합니다.</li>
                  <li>상품 하자의 경우 배송비는 무료이며, 단순 변심의 경우 왕복 배송비가 부과될 수 있습니다.</li>
                </ul>
              </div>
            </>
          )}

          {/* 쿠폰/포인트 */}
          {activeTab === 'coupons' && (
            <>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">보유 쿠폰</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-blue-200 bg-blue-50 rounded-lg p-5 flex items-center justify-between">
                    <div>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded mb-2">가입축하</span>
                      <h4 className="text-lg font-bold text-gray-800">웰컴 10% 할인 쿠폰</h4>
                      <p className="text-sm text-gray-500 mt-1">최대 20,000원 할인 / 5만원 이상 결제시</p>
                      <p className="text-xs text-gray-400 mt-2">2026.04.15 까지</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-100 shadow-sm">
                      10%
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-5 flex items-center justify-between">
                    <div>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded mb-2">생일축하</span>
                      <h4 className="text-lg font-bold text-gray-800">5,000원 중복할인 쿠폰</h4>
                      <p className="text-sm text-gray-500 mt-1">조건 없음</p>
                      <p className="text-xs text-gray-400 mt-2">2026.03.31 까지</p>
                    </div>
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 font-bold border border-gray-100">
                      5천원
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">적립금 내역</h3>
                  <span className="font-bold text-blue-600">총 12,500원</span>
                </div>
                <table className="w-full text-left border-t border-gray-200">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-3 px-4 text-sm font-medium text-gray-500">날짜</th>
                      <th className="py-3 px-4 text-sm font-medium text-gray-500">내용</th>
                      <th className="py-3 px-4 text-sm font-medium text-gray-500 text-right">금액</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-600">2026.03.05</td>
                      <td className="py-3 px-4 text-sm text-gray-800">리뷰 작성 보상 (일반)</td>
                      <td className="py-3 px-4 text-sm text-blue-600 font-medium text-right">+500</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-600">2026.03.01</td>
                      <td className="py-3 px-4 text-sm text-gray-800">상품 구매 적립 (20260301-987654)</td>
                      <td className="py-3 px-4 text-sm text-blue-600 font-medium text-right">+2,000</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-600">2026.02.10</td>
                      <td className="py-3 px-4 text-sm text-gray-800">신규 회원가입 축하</td>
                      <td className="py-3 px-4 text-sm text-blue-600 font-medium text-right">+10,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* 나의 리뷰 */}
          {activeTab === 'reviews' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">나의 리뷰</h3>
                <span className="text-sm text-gray-500">작성가능 1건 / 작성완료 2건</span>
              </div>
              
              <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-blue-800">작성 가능한 리뷰가 1건 있습니다.</h4>
                  <p className="text-sm text-blue-600 mt-1">리뷰 작성 시 최대 1,000원의 적립금을 드립니다.</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 font-medium">작성하러 가기</button>
              </div>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex gap-4">
                    <img src="https://via.placeholder.com/150/e2e8f0/475569?text=Shirt" alt="Product" className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">스탠다드 옥스포드 셔츠</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-400 text-sm">★★★★★</span>
                        <span className="text-xs text-gray-400">2026.02.28 작성</span>
                      </div>
                      <p className="text-gray-800 text-sm leading-relaxed">정사이즈로 딱 맞고 재질도 너무 좋아요. 봄에 입기 딱 좋은 두께감입니다. 배송도 하루만에 와서 대만족!</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex gap-4">
                    <img src="https://via.placeholder.com/150/e2e8f0/475569?text=Socks" alt="Product" className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">무지 크루삭스 5종 세트</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-400 text-sm">★★★★☆</span>
                        <span className="text-xs text-gray-400">2026.02.20 작성</span>
                      </div>
                      <p className="text-gray-800 text-sm leading-relaxed">쫀쫀하고 잘 안벗겨져서 좋아요. 색상도 화면이랑 같습니다. 다만 건조기 돌리니까 약간 줄어드는 느낌은 있네요.</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 회원 정보 수정 */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">회원 정보 수정</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
                  <input type="text" disabled value="admin" className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                  <input type="text" defaultValue="홍길동" className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 변경</label>
                  <input type="password" placeholder="새 비밀번호" className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-2" />
                  <input type="password" placeholder="새 비밀번호 확인" className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰 번호</label>
                  <div className="flex gap-2">
                    <input type="text" defaultValue="010-1234-5678" className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    <button type="button" className="px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 font-medium">인증</button>
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="button" className="flex-1 bg-gray-900 text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">저장하기</button>
                  <button type="button" className="px-6 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium">회원탈퇴</button>
                </div>
              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default MyPage;