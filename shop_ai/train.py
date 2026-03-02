import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib
import os

# 1. 상품 데이터 준비 (실제로는 DB에서 가져온 데이터)
# '청자켓'과 유사한 키워드를 가진 상품들이 추천되도록 구성했습니다.
items = [
    {"id": 1, "name": "데님 빈티지 청자켓", "desc": "봄 가을 입기 좋은 데님 자켓"},
    {"id": 2, "name": "슬림핏 청바지", "desc": "편안한 스트레치 데님 팬츠"},
    {"id": 3, "name": "오버핏 연청 자켓", "desc": "트렌디한 루즈핏 청자켓"},
    {"id": 4, "name": "가죽 라이더 자켓", "desc": "세련된 블랙 가죽 아우터"},
    {"id": 5, "name": "여름용 반팔 티셔츠", "desc": "시원한 면 소재 기본 티"},
    {"id": 6, "name": "워싱 데님 자켓", "desc": "빈티지한 느낌의 청자켓 아우터"}
]
df = pd.DataFrame(items)

# 2. 텍스트 데이터 분석 (이름과 설명을 합쳐서 분석)
df['features'] = df['name'] + " " + df['desc']
tfidf = TfidfVectorizer()
tfidf_matrix = tfidf.fit_transform(df['features'])

# 3. 상품 간의 유사도(코사인 유사도) 계산
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# 4. 모델 및 데이터 저장
if not os.path.exists('model'):
    os.makedirs('model')

# 나중에 API에서 써야 하므로 유사도 행렬과 상품 정보를 저장합니다.
joblib.dump(cosine_sim, "model/cosine_sim.joblib")
joblib.dump(df, "model/items_df.joblib")

print("학습 완료! 상품 유사도 모델이 저장되었습니다.")