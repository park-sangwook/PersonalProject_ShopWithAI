import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib
import os
# DB 연결 설정을 가져옵니다.
from db_connect import get_db_data

@app.get("/train", response_model=RecommendResponse)
def run_training():
    # 1. DB에서 상품 데이터 및 카테고리명을 JOIN해서 가져오기
    query = """
        SELECT 
            p.id, 
            p.name, 
            p.detail,
            c1.code_name AS cat_large,
            c2.code_name AS cat_small
        FROM product p
        LEFT JOIN category_code c1 ON p.category_l = c1.code_id
        LEFT JOIN category_code c2 ON p.category_s = c2.code_id
    """
    df = get_db_data(query)

    if df is None or df.empty:
        print("❌ 학습할 데이터가 DB에 없습니다.")
        return

    # 2. 데이터 전처리 (NULL 값 처리)
    # 텍스트 데이터가 NULL이면 학습 시 오류가 나므로 빈 문자열로 채워줍니다.
    df['name'] = df['name'].fillna('')
    df['detail'] = df['detail'].fillna('')
    df['cat_large'] = df['cat_large'].fillna('')
    df['cat_small'] = df['cat_small'].fillna('')

    # 3. 학습용 통합 특징(Features) 생성
    # 카테고리 정보와 상품명, 상세 설명을 모두 합쳐서 분석합니다.
    df['features'] = (
        df['cat_large'] + " " + 
        df['cat_small'] + " " + 
        df['name'] + " " + 
        df['detail']
    )

    # 4. TF-IDF 및 유사도 계산
    # stop_words='english' 옵션은 영어 불용어를 제거해주며, 한글은 기본 분석됩니다.
    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(df['features'])
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    # 5. 모델 저장 폴더 생성
    if not os.path.exists('model'):
        os.makedirs('model')

    # 6. 결과 저장
    # cosine_sim: 유사도 행렬
    # df: 나중에 ID로 상품 정보를 찾기 위한 데이터프레임
    joblib.dump(cosine_sim, "model/cosine_sim.joblib")
    joblib.dump(df, "model/items_df.joblib")

    print(f"✅ 학습 완료! 총 {len(df)}개의 상품 정보가 'model/' 폴더에 저장되었습니다.")

if __name__ == "__main__":
    run_training()