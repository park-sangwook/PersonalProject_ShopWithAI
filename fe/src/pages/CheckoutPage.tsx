// src/pages/CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

declare global {
  interface Window {
    daum: any;
  }
}

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const items = location.state?.items || [];

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.id || user?.name || '',
    phoneNumber: '',
    address: '',
    detailAddress: '',
    city: '',
    postalCode: '',
  });

  useEffect(() => {
    if (user) {
      setShippingInfo(prev => ({ ...prev, fullName: user.id || user.name }));
    }
  }, [user]);

  const handlePostcode = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setShippingInfo({
          ...shippingInfo,
          address: fullAddress,
          postalCode: data.zonecode,
        });
      },
    }).open();
  };

  const subtotal = items.reduce((sum: number, item: any) => {
    const product = item.product || item;
    const price = product.price || product.productPrice || 0;
    const qty = item.quantity || 1;
    return sum + price * qty;
  }, 0);

  const shippingFee = subtotal > 0 ? 3000 : 0;
  const total = subtotal + shippingFee;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-10">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Shipping Address</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Orderer Name</label>
                  <input 
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                    type="text" 
                    placeholder="Full Name" 
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                    type="text" 
                    placeholder="010-0000-0000" 
                    value={shippingInfo.phoneNumber}
                    onChange={(e) => setShippingInfo({...shippingInfo, phoneNumber: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="flex gap-2">
                  <input 
                    className="flex-1 p-2 border rounded bg-gray-50" 
                    type="text" 
                    placeholder="Postal Code" 
                    value={shippingInfo.postalCode} 
                    readOnly
                  />
                  <button 
                    type="button" 
                    onClick={handlePostcode}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                  >
                    Search Address
                  </button>
                </div>
                <input 
                  className="w-full p-2 border rounded bg-gray-50" 
                  type="text" 
                  placeholder="Address" 
                  value={shippingInfo.address} 
                  readOnly
                />
                <input 
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                  type="text" 
                  placeholder="Detailed Address" 
                  value={shippingInfo.detailAddress}
                  onChange={(e) => setShippingInfo({...shippingInfo, detailAddress: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Payment Method</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <button type="button" className="p-3 border-2 border-blue-500 rounded-lg bg-blue-50 text-blue-700 font-medium">Credit Card</button>
                <button type="button" className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">Bank Transfer</button>
                <button type="button" className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">Mobile Pay</button>
              </div>
              <input className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" type="text" placeholder="Card Number" />
              <div className="grid grid-cols-2 gap-4">
                <input className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" type="text" placeholder="Expiry (MM/YY)" />
                <input className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" type="text" placeholder="CVC" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-min sticky top-8">
            <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Order Summary</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 pr-2">
              {items.length > 0 ? (
                items.map((item: any, idx: number) => {
                  const product = item.product || item;
                  return (
                    <div key={idx} className="flex gap-4 py-2 border-b border-gray-50 last:border-0">
                      <img 
                        src={product.images?.[0] || product.mainImage || product.thumnail1 || product.image || 'https://via.placeholder.com/100/cccccc/ffffff?text=Product'} 
                        alt={product.name} 
                        className="w-20 h-24 object-cover rounded" 
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 line-clamp-1">{product.name || product.productName}</p>
                        {(item.color || item.size) && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.color && `Color: ${item.color}`} {item.size && `Size: ${item.size}`}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mt-0.5">Qty: {item.quantity || 1}</p>
                        <p className="font-bold text-gray-900 mt-1">₩{((product.price || product.productPrice || 0) * (item.quantity || 1)).toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center py-4">주문할 상품이 없습니다.</p>
              )}
            </div>
            
            <div className="space-y-3 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₩{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>₩{shippingFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t">
                <span>Total</span>
                <span className="text-blue-600">₩{total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 border-2 border-gray-800 text-gray-800 py-4 rounded-md font-bold hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
              <button 
                className="flex-[2] bg-gray-900 text-white py-4 rounded-md font-bold hover:bg-gray-800 transition-colors shadow-lg"
                onClick={() => alert('Order Placed Successfully!')}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
