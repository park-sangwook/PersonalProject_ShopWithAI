// src/pages/CheckoutPage.tsx
import React from 'react';

const CheckoutPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="w-full p-2 border rounded" type="text" placeholder="Full Name" />
            <input className="w-full p-2 border rounded" type="text" placeholder="Phone Number" />
          </div>
          <input className="w-full p-2 border rounded" type="text" placeholder="Address Line 1" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="w-full p-2 border rounded" type="text" placeholder="City" />
            <input className="w-full p-2 border rounded" type="text" placeholder="Postal Code" />
          </div>
        </form>
        <h2 className="text-xl font-semibold mt-8 mb-6">Payment Method</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
             <button type="button" className="p-2 border rounded-lg bg-blue-500 text-white border-blue-500">Credit Card</button>
             <button type="button" className="p-2 border rounded-lg">Bank Transfer</button>
             <button type="button" className="p-2 border rounded-lg">Mobile Pay</button>
          </div>
          <input className="w-full p-2 border rounded" type="text" placeholder="Card Number" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="w-full p-2 border rounded" type="text" placeholder="Expiry (MM/YY)" />
            <input className="w-full p-2 border rounded" type="text" placeholder="CVC" />
          </div>
        </form>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg h-min">
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between"><p>Product A (x1)</p><p>₩50,000</p></div>
          <div className="flex justify-between"><p>Product B (x1)</p><p>₩70,000</p></div>
          <hr />
          <div className="flex justify-between font-medium"><p>Subtotal</p><p>₩120,000</p></div>
          <div className="flex justify-between font-medium"><p>Shipping</p><p>₩5,000</p></div>
          <hr />
          <div className="flex justify-between text-lg font-bold"><p>Total</p><p>₩125,000</p></div>
        </div>
        <button className="w-full mt-8 bg-green-600 text-white py-3 rounded-md hover:bg-green-700">Place Order</button>
      </div>
    </div>
  );
};
export default CheckoutPage;
