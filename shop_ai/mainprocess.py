import joblib
from fastapi import FastAPI, HTTPException

app = FastAPI()

# 서버 시작 시 저장된 모델 로드
try:
    cosine_sim = joblib.load("model/cosine_sim.joblib")
    items_df = joblib.load("model/items_df.joblib")
except:
    print("경고: 모델 파일이 없습니다. train.py를 먼저 실행하세요.")
    cosine_sim = None

@app.get("/recommend/{item_id}")
def get_recommend(item_id: int):
    if cosine_sim is None:
        raise HTTPException(status_code=500, detail="모델이 로드되지 않았습니다.")

    try:
        # 1. 해당 상품의 인덱스 찾기
        idx_list = items_df.index[items_df['id'] == item_id].tolist()
        if not idx_list:
            # 상품이 없으면 기본 추천 (인기 상품 등)
            return {"item_id": item_id, "recommendations": [1, 2, 3]}
        
        idx = idx_list[0]

        # 2. 해당 상품과 다른 상품들 간의 유사도 가져오기
        sim_scores = list(enumerate(cosine_sim[idx]))

        # 3. 유사도 순으로 정렬 (자기 자신은 제외)
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = [s for s in sim_scores if s[0] != idx]

        # 4. 상위 3개 상품의 실제 ID 추출
        top_indices = [i[0] for i in sim_scores[:3]]
        recommend_ids = items_df.iloc[top_indices]['id'].tolist()

        return {
            "input_item": item_id,
            "recommendations": recommend_ids
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))