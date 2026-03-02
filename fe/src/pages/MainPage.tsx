// src/pages/MainPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// ProductCard 컴포넌트를 분리하여 재사용성을 높입니다.
const ProductCard: React.FC<{ product: any }> = ({ product }) => (
  <Link to={`/product/${product.id}`} className="group block">
    <div className="overflow-hidden rounded-lg border border-gray-200 group-hover:shadow-xl transition-shadow duration-300">
      <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
      <div className="p-4 bg-white">
        <h3 className="text-md font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-gray-600 font-bold mt-1">{product.price}</p>
      </div>
    </div>
  </Link>
);


const MainPage: React.FC = () => {
  // 섹션별 샘플 데이터
  const featuredProducts = [
    { id: 1, name: '프리미엄 코튼 셔츠', price: '₩55,000', image: 'https://via.placeholder.com/300x300/EBF4FF/86A8E7?text=Featured+1' },
    { id: 2, name: '슬림핏 데님 팬츠', price: '₩72,000', image: 'https://via.placeholder.com/300x300/EBF4FF/86A8E7?text=Featured+2' },
    { id: 3, name: '클래식 레더 슈즈', price: '₩125,000', image: 'https://via.placeholder.com/300x300/EBF4FF/86A8E7?text=Featured+3' },
    { id: 4, name: '미니멀리스트 백팩', price: '₩89,000', image: 'https://via.placeholder.com/300x300/EBF4FF/86A8E7?text=Featured+4' },
  ];

  const newArrivals = [
    { id: 5, name: '오버사이즈 니트 스웨터', price: '₩68,000', image: 'https://via.placeholder.com/300x300/FFFBEB/F9D423?text=New+1' },
    { id: 6, name: '코듀로이 와이드 팬츠', price: '₩75,000', image: 'https://via.placeholder.com/300x300/FFFBEB/F9D423?text=New+2' },
    { id: 7, name: '캔버스 스니커즈', price: '₩49,000', image: 'https://via.placeholder.com/300x300/FFFBEB/F9D423?text=New+3' },
    { id: 8, name: '캐시미어 머플러', price: '₩99,000', image: 'https://via.placeholder.com/300x300/FFFBEB/F9D423?text=New+4' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Banner Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-2xl overflow-hidden">
        <div className="p-8 md:p-12 lg:p-16 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Spring Collection is Here!</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            새로운 계절, 새로운 스타일. 지금 바로 봄 신상품을 만나보세요.
          </p>
          <Link to="/category/all" className="mt-8 inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-transform hover:scale-105">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
