// src/pages/CartPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: '프리미엄 코튼 셔츠', price: 50000, quantity: 1, image: 'https://via.placeholder.com/150/cccccc/ffffff?text=Shirt' },
    { id: 2, name: '슬림핏 데님 팬츠', price: 70000, quantity: 1, image: 'https://via.placeholder.com/150/cccccc/ffffff?text=Pants' },
  ]);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? <p>Your cart is empty.</p> : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ul className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <li key={item.id} className="flex py-6">
                  <img src={item.image} alt={item.name} className="h-24 w-24 rounded-md object-cover" />
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p>₩{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border border-gray-300 rounded-md">
                         <button className="px-3 py-1">-</button>
                         <span className="px-4">{item.quantity}</span>
                         <button className="px-3 py-1">+</button>
                      </div>
                      <button className="font-medium text-red-600 hover:text-red-500">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-gray-200 pt-6 lg:border-none lg:pt-0">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Summary</h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p>Subtotal</p><p>₩{subtotal.toLocaleString()}</p>
                </div>
                 <div className="flex items-center justify-between">
                  <p>Shipping</p><p>₩5,000</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-base font-medium">
                  <p>Total</p><p>₩{(subtotal + 5000).toLocaleString()}</p>
                </div>
              </div>
              <Link to="/checkout" className="block w-full text-center mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">Proceed to Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;
