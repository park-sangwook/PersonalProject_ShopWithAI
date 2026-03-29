// src/pages/CartPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/api/client';

const CartPage: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ['cartItems'],
    queryFn: async () => {
      const response = await apiClient.get('/api/mypage/cart_item');
      let data = response.data || [];
      if (data.data) data = data.data;
      return Array.isArray(data) ? data : [];
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (productId: string | number) => {
      return apiClient.delete(`/api/mypage/cart_item/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    },
  });

  const handleQuantityChange = (id: string | number, delta: number, currentQty: number) => {
    const newQty = Math.max(1, (localQuantities[id] ?? currentQty) + delta);
    setLocalQuantities(prev => ({ ...prev, [id]: newQty }));
  };

  const subtotal = cartItems.reduce((sum: number, item: any) => {
    const product = item.product || item;
    const price = product.price || product.productPrice || 0;
    const qty = (localQuantities[item.id || item.productId || product.id] ?? item.quantity) || 1;
    return sum + price * qty;
  }, 0);

  const handleCheckout = () => {
    const checkoutItems = cartItems.map((item: any) => ({
      ...item,
      quantity: (localQuantities[item.id || item.productId || (item.product && item.product.id)] ?? item.quantity) || 1
    }));
    navigate('/checkout', { state: { items: checkoutItems } });
  };

  if (isLoading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-6">장바구니가 비어 있습니다.</p>
          <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-colors">
            쇼핑하러 가기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item: any) => {
                const product = item.product || item;
                return (
                <li key={item.id || item.productId || product.id} className="flex py-6">
                  <img 
                    src={product.mainImage || product.thumnail1 || product.image || 'https://via.placeholder.com/150/cccccc/ffffff?text=Product'} 
                    alt={product.name || product.productName} 
                    className="h-24 w-24 rounded-md object-cover" 
                  />
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{product.name || product.productName}</h3>
                      <p>₩{((product.price || product.productPrice || 0) * ((localQuantities[item.id || item.productId || product.id] ?? item.quantity) || 1)).toLocaleString()}</p>
                    </div>
                    {(item.color || item.size) && (
                      <p className="mt-1 text-sm text-gray-500">
                        {item.color && `색상: ${item.color} `} {item.size && `사이즈: ${item.size}`}
                      </p>
                    )}
                    <div className="flex flex-1 items-end justify-between text-sm mt-2">
                      <div className="flex items-center border border-gray-300 rounded-md">
                         <button onClick={() => handleQuantityChange(item.id || item.productId || product.id, -1, item.quantity || 1)} className="px-3 py-1 hover:bg-gray-50">-</button>
                         <span className="px-4">{(localQuantities[item.id || item.productId || product.id] ?? item.quantity) || 1}</span>
                         <button onClick={() => handleQuantityChange(item.id || item.productId || product.id, 1, item.quantity || 1)} className="px-3 py-1 hover:bg-gray-50">+</button>
                      </div>
                      <button 
                        onClick={() => {
                          if (window.confirm('장바구니에서 삭제하시겠습니까?')) {
                            removeMutation.mutate(product.id || product.productId || item.id);
                          }
                        }}
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              )})}
            </ul>
          </div>
          <div className="border-t border-gray-200 pt-6 lg:border-none lg:pt-0">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              <h3 className="text-lg font-medium text-gray-900">Summary</h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">상품 금액</p>
                  <p className="font-medium">₩{subtotal.toLocaleString()}</p>
                </div>
                 <div className="flex items-center justify-between">
                  <p className="text-gray-600">배송비</p>
                  <p className="font-medium">₩3,000</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-lg font-bold">
                  <p>총 결제 금액</p>
                  <p className="text-blue-600">₩{(subtotal + 3000).toLocaleString()}</p>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                className="block w-full text-center mt-6 bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors shadow-sm"
              >
                주문하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
