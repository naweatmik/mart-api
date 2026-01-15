# 🛒 마트 식품 API

대한민국 마트에서 판매하는 식품 정보를 제공하는 API입니다.

## 📊 데이터 현황

- **총 40개** 상품 등록
- **5개** 카테고리: 과자, 라면, 음료, 아이스크림, 즉석식품

## 🔗 API 엔드포인트

| 엔드포인트 | 메소드 | 설명 |
|-----------|--------|------|
| `/` | GET | API 정보 |
| `/api/products` | GET | 모든 상품 조회 |
| `/api/products/:id` | GET | 상품 ID로 조회 |
| `/api/products/category/:category` | GET | 카테고리별 조회 |
| `/api/products/brand/:brand` | GET | 브랜드별 조회 |
| `/api/search?q=검색어` | GET | 상품 검색 |
| `/api/products/in-stock` | GET | 재고 있는 상품 |
| `/api/products/price?min=1000&max=5000` | GET | 가격 범위 조회 |
| `/api/categories` | GET | 카테고리 목록 |
| `/api/brands` | GET | 브랜드 목록 |
| `/api/random?count=3` | GET | 랜덤 상품 추천 |

## 📝 상품 데이터 구조

```json
{
  "id": 1,
  "name": "새우깡",
  "category": "과자",
  "price": 1500,
  "weight": "90g",
  "brand": "농심",
  "description": "바삭한 새우맛 스낵",
  "origin": "대한민국",
  "calories": 475,
  "ingredients": ["밀가루", "새우", "..."],
  "allergens": ["밀", "새우", "대두"],
  "storage": "직사광선을 피하고 서늘한 곳에 보관",
  "expiryDays": 180,
  "inStock": true
}
```

## 🚀 사용 예시

```
# 모든 상품 조회
GET /api/products

# 라면 카테고리만 조회
GET /api/products/category/라면

# 농심 브랜드 상품 조회
GET /api/products/brand/농심

# "초코" 검색
GET /api/search?q=초코

# 1000원~3000원 상품
GET /api/products/price?min=1000&max=3000

# 랜덤 5개 추천
GET /api/random?count=5
```
