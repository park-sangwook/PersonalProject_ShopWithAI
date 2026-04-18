// src/pages/MainPage.tsx
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/client';

const ProductCard: React.FC<{ product: any }> = ({ product }) => (
  <Link to={`/product/${product.id || product.productId || product.code_id}`} className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
      <img 
        src={product.mainImage || product.thumnail1 || product.image || 'https://via.placeholder.com/400x500/f8fafc/cbd5e1?text=Product'} 
        alt={product.name || product.productName} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
      />
      {product.isNew && (
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">New</span>
      )}
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <div className="mb-1 text-[11px] text-gray-400 font-semibold uppercase tracking-widest">
        {product.categoryName || 'Collection'}
      </div>
      <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
        {product.name || product.productName}
      </h3>
      <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
        <p className="text-base font-bold text-gray-900">
          {typeof product.price === 'number' ? `₩${product.price.toLocaleString()}` : product.price}
        </p>
        <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
        </div>
      </div>
    </div>
  </Link>
);

const MainPage: React.FC<{ isAllProducts?: boolean }> = ({ isAllProducts }) => {
  const { categoryId, query } = useParams<{ categoryId: string; query: string }>();
  const [sortBy, setSortBy] = useState('latest');

  // 카테고리 목록 조회
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiClient.get('/api/category/category_l');
      let data = response.data || [];
      if (data.data) data = data.data;
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });

  const currentCategory = Array.isArray(categories) 
    ? categories.find((c: any) => String(c.code_id) === String(categoryId))
    : null;
  
  const pageTitle = isAllProducts
    ? 'All Products'
    : query 
      ? `Search results for "${decodeURIComponent(query)}"` 
      : (currentCategory ? currentCategory.code_name : 'Our Collection');

  // 모든 상품 페칭
  const { data: allProducts = [], isLoading: isAllProductsLoading } = useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      const response = await apiClient.get('/api/product/all');
      let data = response.data || [];
      if (data.data) data = data.data;
      if (data.products) data = data.products;
      if (data.content) data = data.content;
      return Array.isArray(data) ? data : (data ? [data] : []);
    },
    enabled: !!isAllProducts,
    staleTime: 1000 * 60 * 10,
  });

  // 검색 결과 페칭
  const { data: searchResults = [], isLoading: isSearchLoading } = useQuery({
    queryKey: ['searchResults', query],
    queryFn: async () => {
      try {
        if (!query) return [];
        const decodedQuery = decodeURIComponent(query);
        const response = await apiClient.get(`/api/product/search/${decodedQuery}`);
        let data = response.data || [];
        if (data.data) data = data.data;
        if (data.products) data = data.products;
        if (data.content) data = data.content;
        return Array.isArray(data) ? data : (data ? [data] : []);
      } catch (err) {
        // 검색 결과가 없는 경우(API에서 에러 처리된 경우) 빈 배열 반환
        return [];
      }
    },
    enabled: !!query,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

  // 카테고리 상품 페칭
  const { data: categoryProducts = [], isLoading: isCategoryLoading } = useQuery({
    queryKey: ['categoryProducts', categoryId],
    queryFn: async () => {
      if (!categoryId) return [];
      const response = await apiClient.get(`/api/product/category/${categoryId}`);
      let products = [];
      if (Array.isArray(response.data)) {
        products = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        products = response.data.data;
      } else if (response.data && Array.isArray(response.data.products)) {
        products = response.data.products;
      } else if (response.data && Array.isArray(response.data.content)) {
        products = response.data.content;
      }
      return products;
    },
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 10,
  });

  // 추천 상품 데이터 페칭
  const { data: featuredProducts = [], isLoading: isFeaturedLoading } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const response = await apiClient.get('/api/product/recommend');
      let data = response.data || [];
      if (data.data) data = data.data;
      if (data.products) data = data.products;
      if (data.content) data = data.content;
      return Array.isArray(data) ? data : (data ? [data] : []);
    },
    enabled: !categoryId && !query && !isAllProducts,
    staleTime: 1000 * 60 * 10,
  });

  // 신상품 데이터 페칭
  const { data: newArrivals = [], isLoading: isNewArrivalsLoading } = useQuery({
    queryKey: ['newArrivals'],
    queryFn: async () => {
      const response = await apiClient.get('/api/product/new_arrivals');
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
    enabled: !categoryId && !query && !isAllProducts,
    staleTime: 1000 * 60 * 10,
  });

  const productList = isAllProducts ? allProducts : (query ? searchResults : (categoryId ? categoryProducts : []));
  const isLoading = isAllProducts ? isAllProductsLoading : (isSearchLoading || isCategoryLoading);

  if (categoryId || query || isAllProducts) {
    return (
      <div className="flex flex-col md:flex-row gap-8 py-4">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 pb-2 border-b border-gray-100">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/product/all" 
                  className={`text-sm transition-colors ${!categoryId ? 'text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  All Products
                </Link>
              </li>
              {categories.map((category: any) => (
                <li key={category.code_id}>
                  <Link 
                    to={`/category/${category.code_id}`} 
                    className={`text-sm transition-colors ${String(categoryId) === String(category.code_id) ? 'text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    {category.code_name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 pb-2 border-b border-gray-100">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-2">Price Range</label>
                  <div className="flex items-center gap-2">
                    <input type="text" placeholder="Min" className="w-full px-3 py-2 text-xs border border-gray-100 rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    <span className="text-gray-300">-</span>
                    <input type="text" placeholder="Max" className="w-full px-3 py-2 text-xs border border-gray-100 rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product List Area */}
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">{pageTitle}</h2>
              <p className="text-sm text-gray-500 mt-1">{productList.length} products found</p>
            </div>
            
            <div className="flex items-center gap-4">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border-none bg-white py-2 pl-3 pr-10 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Popularity</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-[4/5] rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : productList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productList.map((product: any, idx: number) => (
                <ProductCard key={product.id || product.productId || idx} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-20 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria.</p>
              <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-colors">Clear all</Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isFeaturedLoading) return (
    <div className="py-20 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-20 pb-20">
      {/* Modern Hero Banner */}
      <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center text-white px-4">
          <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-sm mb-4">New Season 2026</span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6">REDEFINE YOUR STYLE</h1>
          <p className="max-w-xl text-lg text-gray-200 mb-10 leading-relaxed font-light">
            Experience the perfect blend of comfort and elegance with our curated spring collection.
          </p>
          <div className="flex gap-4">
            <Link to="/product/all" className="bg-white text-gray-900 font-bold py-4 px-10 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
              Shop Collection
            </Link>
            <Link to="/qna" className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold py-4 px-10 rounded-full hover:bg-white/20 transition-all duration-300">
              Customer Center
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <section>
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">사용자 맞춤 추천</h2>
            <div className="h-1.5 w-20 bg-blue-600 mt-2"></div>
          </div>
          <Link to="/product/all" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-2 group">
            View All <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuredProducts.slice(0, 4).map((product: any, idx: number) => (
            <ProductCard key={product.id || product.productId || idx} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-gray-900 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-20 rounded-[4rem]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white tracking-tight">SHOP BY CATEGORY</h2>
            <p className="text-gray-400 mt-4">Find exactly what you're looking for</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category: any, idx: number) => (
              <Link 
                key={category.code_id} 
                to={`/category/${category.code_id}`}
                className="group relative h-40 rounded-2xl overflow-hidden bg-gray-800"
              >
                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-white font-bold text-sm tracking-widest uppercase">{category.code_name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section>
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">NEW ARRIVALS</h2>
            <div className="h-1.5 w-20 bg-blue-600 mt-2"></div>
          </div>
        </div>
        
        {isNewArrivalsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[4/5] rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {newArrivals.slice(0, 8).map((product: any, idx: number) => (
              <ProductCard key={product.id || product.productId || idx} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MainPage;