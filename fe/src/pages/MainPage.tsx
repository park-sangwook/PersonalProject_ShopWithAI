// src/pages/MainPage.tsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/client';

// ProductCard 컴포넌트를 분리하여 재사용성을 높입니다.
const ProductCard: React.FC<{ product: any }> = ({ product }) => (
  <Link to={`/product/${product.id || product.productId || product.code_id}`} className="group block">
    <div className="overflow-hidden rounded-lg border border-gray-200 group-hover:shadow-xl transition-shadow duration-300">
      <img src={product.image || 'https://via.placeholder.com/300x300/FFFBEB/F9D423?text=Product'} alt={product.name || product.productName} className="w-full h-56 object-cover" />
      <div className="p-4 bg-white">
        <h3 className="text-md font-semibold text-gray-800 truncate">{product.name || product.productName}</h3>
        <p className="text-gray-600 font-bold mt-1">
          {typeof product.price === 'number' ? `₩${product.price.toLocaleString()}` : product.price}
        </p>
      </div>
    </div>
  </Link>
);

const MainPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  // 카테고리 목록을 조회하여 선택된 카테고리의 이름(code_name)을 찾습니다. (App.tsx에서 이미 캐싱됨)
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiClient.get('/api/category/category_l');
      let data = response.data || [];
      if (data.data) data = data.data; // 응답 객체 구조 대비
      return data;
    },
  });

  const currentCategory = Array.isArray(categories) 
    ? categories.find((c: any) => String(c.code_id) === String(categoryId))
    : null;
  const categoryName = currentCategory ? currentCategory.code_name : 'Category Products';

  // Fetch category products if categoryId exists
  const { data: categoryProducts = [], isLoading: isCategoryLoading, error: categoryError } = useQuery({
    queryKey: ['categoryProducts', categoryId],
    queryFn: async () => {
      if (!categoryId) return [];
      const response = await apiClient.get(`/api/product/category/${categoryId}`);
      
      // API 응답 구조가 배열이 아닐 수 있으므로 (예: { data: [...] }, { content: [...] }) 안전하게 처리
      let products = [];
      if (Array.isArray(response.data)) {
        products = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        products = response.data.data;
      } else if (response.data && Array.isArray(response.data.products)) {
        products = response.data.products;
      } else if (response.data && Array.isArray(response.data.content)) {
        products = response.data.content;
      } else if (response.data && typeof response.data === 'object') {
        products = [response.data]; // 단일 객체일 경우 배열로 래핑
      }
      return products;
    },
    enabled: !!categoryId,
  });

  // TanStack Query의 useQuery를 사용하여 추천 상품 데이터 페칭
  const { data: featuredProducts = [], isLoading: isFeaturedLoading, error: featuredError } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const response = await apiClient.get('/api/product/recommend');
      let products = [];
      if (Array.isArray(response.data)) {
        products = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        products = response.data.data;
      } else if (response.data && Array.isArray(response.data.content)) {
        products = response.data.content;
      }
      return products;
    },
    staleTime: 1000 * 60 * 50,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !categoryId, // 카테고리 뷰가 아닐 때만 페칭
  });

  const newArrivals = [
    { id: 5, name: '오버사이즈 니트 스웨터', price: '₩68,000', image: 'https://via.placeholder.com/300x300/FFFBEB/F9D423?text=New+1' },
    { id: 6, name: '코듀로이 와이드 팬츠', price: '₩75,000', image: 'https://via.placeholder.com/300x300/FFFBEB/F9D423?text=New+2' },
    { id: 7, name: '캔버스 스니커즈', price: '₩49,000', image: 'https://via.placeholder.com/300x300/FFFBEB/F9D423?text=New+3' },
    { id: 8, name: '캐시미어 머플러', price: '₩99,000', image: 'https://via.placeholder.com/300x300/FFFBEB/F9D423?text=New+4' },
  ];

  if (categoryId) {
    if (isCategoryLoading) return <div className="text-center py-20 text-gray-500">Loading products...</div>;
    if (categoryError) return <div className="text-center py-20 text-red-500">Failed to load products.</div>;

    const productList = Array.isArray(categoryProducts) ? categoryProducts : [];

    return (
      <div className="space-y-12">
        <section>
          {/* 변경점: Category Products 대신 카테고리 이름(code_name)을 표시합니다 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{categoryName}</h2>
          {productList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {productList.map((product: any, idx: number) => (
                <ProductCard key={product.id || product.productId || idx} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">No products found in this category.</div>
          )}
        </section>
      </div>
    );
  }

  if (isFeaturedLoading) return <div className="text-center py-20 text-gray-500">Loading recommendations...</div>;
  if (featuredError) return <div className="text-center py-20 text-red-500">Failed to load recommendations.</div>;

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
          {featuredProducts.map((product: any, idx: number) => (
            <ProductCard key={product.id || product.productId || idx} product={product} />
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