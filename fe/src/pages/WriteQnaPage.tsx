import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const WriteQnaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSecret, setIsSecret] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    alert('상품 문의가 성공적으로 등록되었습니다.');
    navigate(`/product/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">상품 문의하기</h1>
        <div className="mb-6 pb-6 border-b border-gray-100 flex items-center gap-4">
          <img src="https://via.placeholder.com/150/e2e8f0/475569?text=Product" alt="Product" className="w-16 h-16 object-cover rounded-md" />
          <div>
            <p className="text-sm text-gray-500">프리미엄 코튼 오버핏 셔츠 (상품 ID: {id})</p>
            <p className="font-medium text-gray-800">상품에 대해 궁금한 점을 남겨주세요.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">문의 제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="제목을 입력해주세요."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">문의 내용</label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="내용을 입력해주세요."
            ></textarea>
          </div>

          <div className="flex items-center">
            <input
              id="secret-checkbox"
              type="checkbox"
              checked={isSecret}
              onChange={(e) => setIsSecret(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="secret-checkbox" className="ml-2 block text-sm text-gray-900">
              비밀글로 문의하기
            </label>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <ul className="list-disc list-inside space-y-1">
              <li>상품과 관련 없는 내용, 비방, 욕설 등은 임의로 삭제될 수 있습니다.</li>
              <li>전화번호, 이메일 등의 개인정보는 절대 남기지 마세요.</li>
            </ul>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={() => navigate(-1)} className="flex-1 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors">취소</button>
            <button type="submit" className="flex-1 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors">등록하기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteQnaPage;