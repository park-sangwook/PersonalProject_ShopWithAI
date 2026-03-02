// src/pages/ProductDetailPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const product = {
    id: id,
    name: '프리미엄 코튼 셔츠',
    price: 50000,
    description: '최고급 원단으로 제작되어 부드럽고 착용감이 뛰어납니다. 어떤 스타일에도 잘 어울리는 클래식한 디자인입니다.',
    images: [
      'https://via.placeholder.com/600x750/cccccc/ffffff?text=Shirt+Front',
      'https://via.placeholder.com/600x750/cccccc/ffffff?text=Shirt+Side',
      'https://via.placeholder.com/600x750/cccccc/ffffff?text=Shirt+Back',
    ],
  };
  const [mainImage, setMainImage] = useState(product.images[0]);
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 flex gap-4">
          <div className="flex flex-col gap-3">
            {product.images.map((img, index) => (
              <img key={index} src={img} alt={`thumbnail ${index + 1}`} className={`w-20 h-24 object-cover cursor-pointer rounded-md border-2 ${mainImage === img ? 'border-blue-500' : 'border-transparent'}`} onMouseOver={() => setMainImage(img)} />
            ))}
          </div>
          <div className="flex-1">
            <img src={mainImage} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-6 text-4xl font-semibold text-gray-900">₩{product.price.toLocaleString()}</p>
          <div className="mt-8 flex items-center gap-4">
            <label htmlFor="quantity" className="font-medium">수량:</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 text-lg">-</button>
              <span className="px-4 py-1">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 text-lg">+</button>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-800 transition-colors">Add to Cart</button>
            <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailPage;
