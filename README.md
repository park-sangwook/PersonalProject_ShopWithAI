# PersonalProject_ShopWithAI 🛒

> **Spring Boot와 FastAPI를 결합한 지능형 맞춤 추천 쇼핑몰 플랫폼**

사용자의 활동 데이터를 실시간으로 분석하여 개인화된 상품을 제안하는 쇼핑몰 서비스입니다. 
**Spring Boot**의 견고한 비즈니스 로직과 **FastAPI**의 빠른 데이터 처리 능력을 결합하여 현대적인 이커머스 아키텍처를 구현했습니다.

---

## 🚀 주요 기능 (Key Features)

* **맞춤형 추천 엔진:** 사용자 행동 데이터를 기반으로 한 FastAPI 추천 API 연동.
* **보안 인증:** Spring Security + JWT(JSON Web Token)를 활용한 무상태(Stateless) 인증 시스템.
* **데이터 최적화:** JPA와 **Querydsl**을 사용하여 복잡한 동적 쿼리 최적화 및 타입 안정성 확보.
* **효율적 데이터 페칭:** **TanStack Query(React Query)**를 도입하여 불필요한 API 호출 최소화 및 클라이언트 캐싱 구현.
* **AI 기반 개발:** `gemini-cli`를 활용한 **바이브 코딩(Vibe Coding)**을 통해 프론트엔드 생산성 및 UI 완성도 극대화.

---

## 🛠 기술 스택 (Tech Stack)

### Backend (Main Service)
* **Framework:** Java 17, Spring Boot 3.x
* **Security:** Spring Security, JWT
* **Data:** Spring Data JPA, **Querydsl**
* **Database:** MariaDB

### AI & Recommendation (Python)
* **Framework:** **FastAPI**
* **Libraries:** Pandas, Scikit-learn
* **Communication:** RestTemplate을 이용한 서버 간 동신 (Java to Python)

### Frontend
* **Framework:** React (TypeScript)
* **State Management:** **TanStack Query (React Query)**
* **Development Tool:** `gemini-cli`

---

## 🏗 시스템 아키텍처 (Architecture)

```mermaid
graph TD
    User[사용자] <--> React[React Frontend]
    React <--> Spring[Spring Boot API Server]
    Spring <--> DB[(MariaDB)]
    Spring -- RestTemplate --> FastAPI[FastAPI Recommendation Engine]
