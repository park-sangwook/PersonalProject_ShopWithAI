import joblib
import os
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from contextlib import asynccontextmanager

# 전역 변수로 모델 관리
cosine_sim = None
items_df = None

def load_model():
    global cosine_sim, items_df
    model_path = "model/cosine_sim.joblib"
    df_path = "model/items_df.joblib"
    
    if os.path.exists(model_path) and os.path.exists(df_path):
        # 최신 버전의 joblib 로드
        cosine_sim = joblib.load(model_path)
        items_df = joblib.load(df_path)
        # 인덱스가 0부터 순차적으로 정렬되어 있는지 보장 (매우 중요)
        items_df = items_df.reset_index(drop=True)
        print(f"✅ 모델 및 {len(items_df)}개의 상품 데이터를 로드했습니다.")
    else:
        print("⚠️ 모델 파일이 없습니다. train.py를 먼저 실행하세요.")

# 최신 FastAPI 스타일의 lifespan 설정 (startup/shutdown 관리)
@asynccontextmanager
async def lifespan(app: FastAPI):
    load_model()
    yield

app = FastAPI(lifespan=lifespan)

# 응답 규격 정의
class RecommendResponse(BaseModel):
    input_item: int
    recommendations: List[int]

@app.get("/recommend/{item_id}", response_model=RecommendResponse)
def get_recommend(item_id: int):
    if cosine_sim is None or items_df is None:
        raise HTTPException(status_code=500, detail="서버 모델이 준비되지 않았습니다.")

    try:
        # 1. 해당 상품 ID가 데이터프레임에 있는지 확인
        target_rows = items_df[items_df['id'] == item_id]
        
        if target_rows.empty:
            # DB에 없는 상품 요청 시 기본 추천 (예: 최신 등록 상품 3개)
            default_ids = items_df['id'].tail(4).astype(int).tolist()
            return {"input_item": item_id, "recommendations": default_ids}
        
        # 2. 해당 상품의 위치(인덱스) 찾기
        idx = target_rows.index[0]

        # 3. 유사도 점수 가져오기
        # cosine_sim 행렬에서 해당 인덱스의 유사도 리스트 추출
        sim_scores = list(enumerate(cosine_sim[idx]))

        # 4. 유사도 기준 정렬 및 자기 자신(idx) 제외
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        # 자기 자신을 제외하고 유사도가 높은 순서대로 추출
        sim_scores = [s for s in sim_scores if s[0] != idx]

        # 5. 상위 3개 상품의 인덱스 추출
        top_indices = [i[0] for i in sim_scores[:3]]
        
        # 6. 인덱스를 실제 상품 ID로 변환 (int 타입 보장)
        recommend_ids = items_df.iloc[top_indices]['id'].apply(int).tolist()

        return {
            "input_item": item_id,
            "recommendations": recommend_ids
        }

    except Exception as e:
        print(f"❌ 추천 오류 발생: {e}")
        raise HTTPException(status_code=500, detail="추천 처리 중 오류가 발생했습니다.")

@app.post("/reload")
def reload_model():
    load_model()
    return {"message": "모델이 성공적으로 다시 로드되었습니다."}

if __name__ == "__main__":
    import uvicorn
    # 외부 접근 허용을 위해 0.0.0.0으로 설정
    uvicorn.run(app, host="0.0.0.0", port=8000)