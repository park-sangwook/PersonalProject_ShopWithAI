import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import apiClient from '@/api/client';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  // useQuery를 사용하여 상품 상세 정보 페칭 (캐싱 적용)
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      let data: any = {};
      try {
        const response = await apiClient.get(`/api/product/${id}`);
        // API 응답 구조에 맞게 데이터를 추출합니다 (예: response.data.data 또는 response.data)z
        data = response.data?.data || response.data?.product || response.data || {};
      } catch (err) {
        console.warn('API fetch failed, using fallback mock data');
      }

      // API 데이터와 UI에서 필요한 필드를 매핑하고, 누락된 필드는 기본값으로 채웁니다.
      return {
        id: data.id || data.productId || id || '1',
        name: data.name || data.productName || '프리미엄 코튼 오버핏 셔츠',
        price: data.price !== undefined ? data.price : 50000,
        rating: data.rating || 4.8,
        reviewCount: data.reviewCount || 128,
        categoryL: data.categoryL || data.category_l || '상의',
        categoryS: data.categoryS || data.category_s || '셔츠',
        description: data.description || data.productDesc || '최고급 원단으로 제작되어 부드럽고 착용감이 뛰어납니다. 어떤 스타일에도 잘 어울리는 클래식한 디자인입니다.',
        images: (data.mainImage || data.thumnail1) 
          ? [data.mainImage, data.thumnail1, data.thumnail2].filter(Boolean)
          : (data.images || (data.image ? [data.image, 'https://via.placeholder.com/600x750/e2e8f0/475569?text=Side', 'https://via.placeholder.com/600x750/e2e8f0/475569?text=Back'] : [
          'https://via.placeholder.com/600x750/e2e8f0/475569?text=Front',
          'https://via.placeholder.com/600x750/e2e8f0/475569?text=Side',
          'https://via.placeholder.com/600x750/e2e8f0/475569?text=Back',
          'https://via.placeholder.com/600x750/e2e8f0/475569?text=Detail',
        ])),
        detailedImages: (data.productDetail?.detailImage1 || data.detailImage1) 
          ? [
              data.productDetail?.detailImage1 || data.detailImage1,
              data.productDetail?.detailImage2 || data.detailImage2,
              data.productDetail?.detailImage3 || data.detailImage3
            ].filter(Boolean)
          : (data.detailedImages || [
          'https://via.placeholder.com/1000x800/f8fafc/94a3b8?text=Product+Detail+1',
          'https://via.placeholder.com/1000x800/f8fafc/94a3b8?text=Product+Detail+2',
          'https://via.placeholder.com/1000x1200/f8fafc/94a3b8?text=Product+Detail+3',
        ]),
        reviews: data.reviews || [
          { id: 1, author: '김**', date: '2026-03-12', rating: 5, content: '핏이 정말 예뻐요! 재질도 부드럽고 한 여름 빼고는 다 입을 수 있을 것 같습니다. 다른 색상도 구매할 예정입니다.', image: 'https://via.placeholder.com/150/cbd5e1/475569?text=Review1' },
          { id: 2, author: '이**', date: '2026-03-10', rating: 4, content: '배송이 하루만에 와서 좋았어요. 약간 구김이 가긴 하는데 다림질하면 괜찮습니다. 가성비 최고네요.', image: null },
          { id: 3, author: '박**', date: '2026-03-05', rating: 5, content: '사이즈 고민 많았는데 정사이즈로 가니 딱 맞네요. 어깨 라인이 예쁘게 떨어져서 체형 보정도 됩니다. 만족합니다.', image: 'https://via.placeholder.com/150/cbd5e1/475569?text=Review2' },
        ]
      };
    },
  });

  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  if (isLoading) return <div className="text-center py-20 text-gray-500">Loading product details...</div>;
  if (error || !product) return <div className="text-center py-20 text-red-500">Failed to load product.</div>;

  const handleAuthAction = async (actionName: string) => {
    if (!isLoggedIn) {
      alert('로그인 이후 이용가능합니다.');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    
    if (actionName === '바로 구매하기') {
      navigate('/checkout');
    } else if (actionName === '리뷰 작성하기') {
      navigate(`/write-review/${id || '1'}`);
    } else if (actionName === '문의하기') {
      navigate(`/write-qna/${id || '1'}`);
    } else if (actionName === '장바구니 담기') {
      try {
        await apiClient.post('/api/mypage/cart_item', { 
          productId: id,
          quantity: quantity // optional but good to have
        });
        alert('장바구니에 상품이 담겼습니다.');
      } catch (err) {
        console.error('Failed to add to cart:', err);
        alert('장바구니 담기에 실패했습니다.');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Product Summary */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Images Gallery */}
          <div className="flex-1 flex gap-4">
            <div className="flex flex-col gap-3">
              {product.images.map((img: string, index: number) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`thumbnail ${index + 1}`} 
                  className={`w-20 h-24 object-cover cursor-pointer rounded-md border-2 transition-colors ${mainImage === img ? 'border-blue-500' : 'border-transparent hover:border-gray-300'}`} 
                  onMouseOver={() => setMainImage(img)} 
                  onClick={() => setMainImage(img)} 
                />
              ))}
            </div>
            <div className="flex-1">
              <img src={mainImage || ''} alt={product.name} className="w-full h-[600px] object-cover rounded-lg" />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <div className="mb-2 text-sm text-gray-500">카테고리 &gt; {product.categoryL} &gt; {product.categoryS}</div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            
            <div className="flex items-center gap-2 mt-3 mb-6">
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 && '☆'}
              </div>
              <span className="text-gray-600 font-medium">{product.rating}</span>
              <span className="text-gray-400 text-sm">({product.reviewCount} 리뷰)</span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
            <div className="text-4xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-8">
              ₩{product.price.toLocaleString()}
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <label className="w-20 font-medium text-gray-700">색상</label>
                <select className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>선택해주세요</option>
                  <option>블랙</option>
                  <option>화이트</option>
                  <option>네이비</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label className="w-20 font-medium text-gray-700">사이즈</label>
                <select className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>선택해주세요</option>
                  <option>M (95)</option>
                  <option>L (100)</option>
                  <option>XL (105)</option>
                </select>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <label className="w-20 font-medium text-gray-700">수량</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-white">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 text-lg hover:bg-gray-100 transition-colors">-</button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 text-lg hover:bg-gray-100 transition-colors">+</button>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between">
              <span className="text-lg font-medium text-gray-700">총 상품 금액</span>
              <span className="text-3xl font-bold text-blue-600">₩{(product.price * quantity).toLocaleString()}</span>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button onClick={() => handleAuthAction('장바구니 담기')} className="w-full bg-white border-2 border-gray-800 text-gray-800 font-bold py-4 rounded-md hover:bg-gray-50 transition-colors">장바구니 담기</button>
              <button onClick={() => handleAuthAction('바로 구매하기')} className="w-full bg-gray-900 text-white font-bold py-4 rounded-md hover:bg-gray-800 transition-colors">바로 구매하기</button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details & Reviews Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 sticky top-0 bg-white z-10">
          <button 
            className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${activeTab === 'details' ? 'border-b-4 border-gray-900 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('details')}
          >
            상품 상세정보
          </button>
          <button 
            className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${activeTab === 'reviews' ? 'border-b-4 border-gray-900 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('reviews')}
          >
            리뷰 ({product.reviewCount})
          </button>
          <button 
            className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${activeTab === 'qna' ? 'border-b-4 border-gray-900 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('qna')}
          >
            Q&A
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'details' && (
            <div className="flex flex-col items-center gap-8 py-10">
              <div className="max-w-3xl text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Timeless Classic, Premium Fit</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  매일 입어도 질리지 않는 기본에 충실한 셔츠입니다. <br/>
                  최고급 코튼 소재를 사용하여 피부에 닿는 촉감이 부드러우며, <br/>
                  오랜 시간 착용해도 형태가 잘 유지됩니다.
                </p>
              </div>
              {product.detailedImages.map((img: string, idx: number) => (
                <img key={idx} src={img} alt={`Detail ${idx + 1}`} className="w-full max-w-xl rounded-lg shadow-sm" />
              ))}
              
              {/* Product Info Table */}
              <div className="w-full max-w-4xl mt-16">
                <h3 className="text-xl font-bold mb-4 border-b-2 border-gray-900 pb-2">상품 정보 고시</h3>
                <table className="w-full text-left text-sm text-gray-600 border-t border-gray-200">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <th className="py-4 px-4 bg-gray-50 w-1/4 font-medium">소재</th>
                      <td className="py-4 px-4">면 100%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="py-4 px-4 bg-gray-50 font-medium">색상</th>
                      <td className="py-4 px-4">블랙, 화이트, 네이비</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="py-4 px-4 bg-gray-50 font-medium">제조사</th>
                      <td className="py-4 px-4">(주)제미니어패럴</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="py-4 px-4 bg-gray-50 font-medium">제조국</th>
                      <td className="py-4 px-4">대한민국</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="py-4 px-4 bg-gray-50 font-medium">세탁방법 및 취급시 주의사항</th>
                      <td className="py-4 px-4">단독 손세탁 권장, 건조기 사용 금지</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="py-6">
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-gray-900 mb-2">{product.rating}</p>
                    <div className="flex text-yellow-400 text-xl justify-center">★★★★★</div>
                  </div>
                  <div className="border-l border-gray-200 pl-6 space-y-2">
                    <p className="text-gray-600"><strong>{product.reviewCount}</strong>개의 리뷰가 있습니다.</p>
                    <p className="text-sm text-gray-500">구매자들의 95%가 이 상품에 만족했습니다.</p>
                  </div>
                </div>
                <button onClick={() => handleAuthAction('리뷰 작성하기')} className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
                  리뷰 작성하기
                </button>
              </div>

              <div className="space-y-8">
                {product.reviews.map((review: any) => (
                  <div key={review.id} className="border-b border-gray-100 pb-8 last:border-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{review.author}</p>
                          <div className="flex items-center gap-2">
                            <span className="flex text-yellow-400 text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                            <span className="text-xs text-gray-400">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">구매확정</span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mt-4">{review.content}</p>
                    
                    {review.image && (
                      <div className="mt-4">
                        <img src={review.image} alt="Review" className="w-32 h-32 object-cover rounded-md border border-gray-200" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center gap-2 mt-10">
                <button className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50">&lt;</button>
                <button className="w-10 h-10 bg-gray-900 text-white rounded-md flex items-center justify-center font-medium">1</button>
                <button className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50">2</button>
                <button className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50">3</button>
                <button className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50">&gt;</button>
              </div>
            </div>
          )}

          {activeTab === 'qna' && (
            <div className="py-10 text-center">
              <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">등록된 Q&A가 없습니다.</h3>
              <p className="text-gray-500 mb-8">상품에 대해 궁금한 점을 남겨주시면 빠르게 답변해 드립니다.</p>
              <button onClick={() => handleAuthAction('문의하기')} className="bg-gray-900 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
                문의하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
