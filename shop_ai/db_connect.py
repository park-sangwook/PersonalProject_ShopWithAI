from sqlalchemy import create_engine
import pandas as pd

# MariaDB 연결 설정 (본인의 환경에 맞게 수정하세요)
# 형식: mysql+pymysql://사용자:비밀번호@호스트:포트/DB이름
DB_URL = "mysql+pymysql://shopuser:123456@localhost:3306/shop"

def get_db_data(query):
    """
    SQL 쿼리를 받아 Pandas DataFrame으로 반환합니다.
    """
    engine = create_engine(DB_URL)
    try:
        # DB에서 데이터를 읽어와 DataFrame 생성
        df = pd.read_sql(query, con=engine)
        return df
    except Exception as e:
        print(f"데이터베이스 연결 오류: {e}")
        return None