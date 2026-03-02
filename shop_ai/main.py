from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "홈쇼핑 AI 서버가 작동 중입니다!"}

@app.get("/recommend/{user_id}")
def get_recommend(user_id: int):
    # 나중에 여기에 LightFM 모델 로직이 들어갑니다.
    return {"user_id": user_id, "items": [1, 5, 12, 45]}



