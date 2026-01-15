const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS 설정 - 모든 도메인에서 접근 허용
app.use(cors());
app.use(express.json());

// 이미지 URL 생성 함수 (200x200 사이즈 통일)
const getImageUrl = (id, category) => {
  // 카테고리별 색상 지정
  const colors = {
    "과자": "FF6B6B",    // 빨간색
    "라면": "FFE66D",    // 노란색
    "음료": "4ECDC4",    // 청록색
    "아이스크림": "A8E6CF", // 민트색
    "즉석식품": "DDA0DD"   // 보라색
  };
  const color = colors[category] || "CCCCCC";
  return `https://via.placeholder.com/200x200/${color}/FFFFFF?text=${encodeURIComponent(category)}+${id}`;
};

// 마트 식품 데이터 (40개)
const products = [
  // 과자류 (10개)
  {
    id: 1,
    name: "새우깡",
    category: "과자",
    price: 1500,
    weight: "90g",
    brand: "농심",
    description: "바삭한 새우맛 스낵, 1971년 출시된 대한민국 대표 과자",
    origin: "대한민국",
    calories: 475,
    ingredients: ["밀가루", "새우", "식물성유지", "설탕", "소금"],
    allergens: ["밀", "새우", "대두"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 180,
    inStock: true,
    image: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=새우깡"
  },
  {
    id: 2,
    name: "포카칩 오리지널",
    category: "과자",
    price: 1800,
    weight: "66g",
    brand: "오리온",
    description: "100% 생감자로 만든 담백한 감자칩",
    origin: "대한민국",
    calories: 360,
    ingredients: ["감자", "식물성유지", "소금", "설탕"],
    allergens: ["대두"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 150,
    inStock: true,
    image: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=포카칩"
  },
  {
    id: 3,
    name: "꼬깔콘 고소한맛",
    category: "과자",
    price: 1600,
    weight: "72g",
    brand: "롯데",
    description: "옥수수로 만든 고소하고 바삭한 콘스낵",
    origin: "대한민국",
    calories: 395,
    ingredients: ["옥수수", "식물성유지", "설탕", "소금"],
    allergens: ["대두"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 180,
    inStock: true,
    image: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=꼬깔콘"
  },
  {
    id: 4,
    name: "프링글스 오리지널",
    category: "과자",
    price: 3500,
    weight: "110g",
    brand: "켈로그",
    description: "균일한 모양의 감자칩, 특유의 원통 패키지",
    origin: "미국",
    calories: 525,
    ingredients: ["감자", "식물성유지", "밀전분", "소금"],
    allergens: ["밀"],
    storage: "개봉 후 밀봉하여 보관",
    expiryDays: 365,
    inStock: true,
    image: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=프링글스"
  },
  {
    id: 5,
    name: "오징어집",
    category: "과자",
    price: 1400,
    weight: "83g",
    brand: "농심",
    description: "오징어 모양의 바삭한 스낵",
    origin: "대한민국",
    calories: 435,
    ingredients: ["밀가루", "오징어분말", "식물성유지", "설탕"],
    allergens: ["밀", "오징어", "대두"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 180,
    inStock: true,
    image: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=오징어집"
  },
  {
    id: 6,
    name: "초코파이",
    category: "과자",
    price: 4500,
    weight: "468g (12개입)",
    brand: "오리온",
    description: "부드러운 마시멜로와 초콜릿이 조화로운 국민 파이",
    origin: "대한민국",
    calories: 165,
    ingredients: ["밀가루", "설탕", "초콜릿", "마시멜로", "계란"],
    allergens: ["밀", "계란", "대두", "우유"],
    storage: "서늘하고 건조한 곳에 보관",
    expiryDays: 120,
    inStock: true,
    image: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=초코파이"
  },
  {
    id: 7,
    name: "칸쵸",
    category: "과자",
    price: 1800,
    weight: "54g",
    brand: "롯데",
    description: "바삭한 비스킷 속에 부드러운 초콜릿 크림",
    origin: "대한민국",
    calories: 285,
    ingredients: ["밀가루", "설탕", "초콜릿", "식물성유지"],
    allergens: ["밀", "대두", "우유"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 180,
    inStock: true,
    image: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=칸쵸"
  },
  {
    id: 8,
    name: "홈런볼",
    category: "과자",
    price: 2000,
    weight: "46g",
    brand: "해태",
    description: "가벼운 퍼프 속에 달콤한 초콜릿 크림",
    origin: "대한민국",
    calories: 245,
    ingredients: ["밀가루", "설탕", "초콜릿", "식물성유지"],
    allergens: ["밀", "대두", "우유"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 150,
    inStock: false,
    image: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=홈런볼"
  },
  {
    id: 9,
    name: "빼빼로 초코",
    category: "과자",
    price: 1500,
    weight: "54g",
    brand: "롯데",
    description: "바삭한 스틱에 달콤한 초콜릿 코팅",
    origin: "대한민국",
    calories: 270,
    ingredients: ["밀가루", "초콜릿", "설탕", "식물성유지"],
    allergens: ["밀", "대두", "우유"],
    storage: "서늘하고 건조한 곳에 보관",
    expiryDays: 365,
    inStock: true,
    image: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=빼빼로"
  },
  {
    id: 10,
    name: "오레오 오리지널",
    category: "과자",
    price: 2500,
    weight: "100g",
    brand: "동서식품",
    description: "바삭한 초코 쿠키 사이에 달콤한 크림",
    origin: "중국",
    calories: 480,
    ingredients: ["밀가루", "설탕", "코코아", "식물성유지"],
    allergens: ["밀", "대두"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 270,
    inStock: true,
    image: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=오레오"
  },

  // 라면류 (8개)
  {
    id: 11,
    name: "신라면",
    category: "라면",
    price: 950,
    weight: "120g",
    brand: "농심",
    description: "매콤한 국물이 일품인 대한민국 대표 라면",
    origin: "대한민국",
    calories: 505,
    ingredients: ["밀가루", "전분", "고춧가루", "쇠고기엑기스"],
    allergens: ["밀", "대두", "쇠고기"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 180,
    inStock: true,
    image: "https://via.placeholder.com/200x200/FFE66D/333333?text=신라면"
  },
  {
    id: 12,
    name: "진라면 순한맛",
    category: "라면",
    price: 850,
    weight: "120g",
    brand: "오뚜기",
    description: "구수하고 담백한 국물의 순한 라면",
    origin: "대한민국",
    calories: 495,
    ingredients: ["밀가루", "전분", "쇠고기엑기스", "양념분말"],
    allergens: ["밀", "대두", "쇠고기"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 180,
    inStock: true,
    image: "https://via.placeholder.com/200x200/FFE66D/333333?text=진라면"
  },
  {
    id: 13,
    name: "짜파게티",
    category: "라면",
    price: 1050,
    weight: "140g",
    brand: "농심",
    description: "달콤한 춘장소스의 짜장라면",
    origin: "대한민국",
    calories: 605,
    ingredients: ["밀가루", "춘장", "식물성유지", "양파"],
    allergens: ["밀", "대두"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 180,
    inStock: true,
    image: "https://via.placeholder.com/200x200/FFE66D/333333?text=짜파게티"
  },
  {
    id: 14,
    name: "불닭볶음면",
    category: "라면",
    price: 1350,
    weight: "140g",
    brand: "삼양",
    description: "극강의 매운맛 볶음면, 글로벌 인기 라면",
    origin: "대한민국",
    calories: 530,
    ingredients: ["밀가루", "고춧가루", "식물성유지", "닭고기엑기스"],
    allergens: ["밀", "대두", "닭고기"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 180,
    inStock: true,
    image: "https://via.placeholder.com/200x200/FFE66D/333333?text=불닭볶음면"
  },
  {
    id: 15,
    name: "너구리",
    category: "라면",
    price: 1050,
    weight: "120g",
    brand: "농심",
    description: "쫄깃한 면발과 다시마의 시원한 국물",
    origin: "대한민국",
    calories: 495,
    ingredients: ["밀가루", "다시마", "전분", "해물엑기스"],
    allergens: ["밀", "대두", "조개류"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 180,
    inStock: true,
    image: "https://via.placeholder.com/200x200/FFE66D/333333?text=너구리"
  },
  {
    id: 16,
    name: "안성탕면",
    category: "라면",
    price: 900,
    weight: "125g",
    brand: "농심",
    description: "구수한 된장맛 국물의 한국적인 라면",
    origin: "대한민국",
    calories: 515,
    ingredients: ["밀가루", "된장", "쇠고기엑기스", "전분"],
    allergens: ["밀", "대두", "쇠고기"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 180,
    inStock: true,
    image: "https://via.placeholder.com/200x200/FFE66D/333333?text=안성탕면"
  },
  {
    id: 17,
    name: "참깨라면",
    category: "라면",
    price: 950,
    weight: "115g",
    brand: "오뚜기",
    description: "고소한 참깨향이 일품인 담백한 라면",
    origin: "대한민국",
    calories: 485,
    ingredients: ["밀가루", "참깨", "식물성유지", "전분"],
    allergens: ["밀", "대두", "참깨"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 180,
    inStock: true,
    image: "https://via.placeholder.com/200x200/FFE66D/333333?text=참깨라면"
  },
  {
    id: 18,
    name: "김치라면",
    category: "라면",
    price: 950,
    weight: "120g",
    brand: "오뚜기",
    description: "시원하고 칼칼한 김치맛 라면",
    origin: "대한민국",
    calories: 490,
    ingredients: ["밀가루", "김치", "고춧가루", "전분"],
    allergens: ["밀", "대두"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 180,
    inStock: false,
    image: "https://via.placeholder.com/200x200/FFE66D/333333?text=김치라면"
  },

  // 음료류 (8개)
  {
    id: 19,
    name: "코카콜라",
    category: "음료",
    price: 1800,
    weight: "500ml",
    brand: "코카콜라",
    description: "1886년 탄생한 세계적인 탄산음료",
    origin: "대한민국",
    calories: 210,
    ingredients: ["정제수", "설탕", "탄산가스", "캐러멜색소", "인산"],
    allergens: [],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 270,
    inStock: true,
    image: "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=코카콜라"
  },
  {
    id: 20,
    name: "스프라이트",
    category: "음료",
    price: 1800,
    weight: "500ml",
    brand: "코카콜라",
    description: "상쾌한 레몬라임향 탄산음료",
    origin: "대한민국",
    calories: 195,
    ingredients: ["정제수", "설탕", "탄산가스", "구연산", "레몬라임향"],
    allergens: [],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 270,
    inStock: true,
    image: "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=스프라이트"
  },
  {
    id: 21,
    name: "밀키스",
    category: "음료",
    price: 1500,
    weight: "500ml",
    brand: "롯데칠성",
    description: "우유와 탄산의 부드러운 조화",
    origin: "대한민국",
    calories: 225,
    ingredients: ["정제수", "설탕", "탄산가스", "유청", "탈지분유"],
    allergens: ["우유"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 180,
    inStock: true,
    image: "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=밀키스"
  },
  {
    id: 22,
    name: "포카리스웨트",
    category: "음료",
    price: 1600,
    weight: "500ml",
    brand: "동아오츠카",
    description: "이온음료의 대명사, 몸에 빠르게 흡수",
    origin: "대한민국",
    calories: 125,
    ingredients: ["정제수", "설탕", "식염", "구연산", "염화칼륨"],
    allergens: [],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 365,
    inStock: true,
    image: "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=포카리스웨트"
  },
  {
    id: 23,
    name: "비타500",
    category: "음료",
    price: 800,
    weight: "100ml",
    brand: "광동제약",
    description: "비타민C 500mg 함유 건강음료",
    origin: "대한민국",
    calories: 45,
    ingredients: ["정제수", "비타민C", "액상과당", "구연산"],
    allergens: [],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 545,
    inStock: true,
    image: "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=비타500"
  },
  {
    id: 24,
    name: "제주 삼다수",
    category: "음료",
    price: 1200,
    weight: "2L",
    brand: "제주개발공사",
    description: "제주 화산암반수로 만든 천연 미네랄워터",
    origin: "대한민국 (제주도)",
    calories: 0,
    ingredients: ["제주 화산암반수"],
    allergens: [],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 730,
    inStock: true,
    image: "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=삼다수"
  },
  {
    id: 25,
    name: "초코우유",
    category: "음료",
    price: 1300,
    weight: "300ml",
    brand: "서울우유",
    description: "진한 초콜릿맛 가공우유",
    origin: "대한민국",
    calories: 225,
    ingredients: ["원유", "코코아분말", "설탕", "탈지분유"],
    allergens: ["우유"],
    storage: "냉장보관 (0~10°C)",
    expiryDays: 14,
    inStock: true,
    image: "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=초코우유"
  },
  {
    id: 26,
    name: "바나나우유",
    category: "음료",
    price: 1500,
    weight: "240ml",
    brand: "빙그레",
    description: "1974년 출시된 국민 가공우유",
    origin: "대한민국",
    calories: 225,
    ingredients: ["원유", "바나나농축액", "설탕", "탈지분유"],
    allergens: ["우유"],
    storage: "냉장보관 (0~10°C)",
    expiryDays: 14,
    inStock: true,
    image: "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=바나나우유"
  },

  // 아이스크림 (6개)
  {
    id: 27,
    name: "메로나",
    category: "아이스크림",
    price: 1200,
    weight: "60ml",
    brand: "빙그레",
    description: "달콤한 멜론맛 아이스바",
    origin: "대한민국",
    calories: 120,
    ingredients: ["정제수", "설탕", "멜론농축액", "탈지분유"],
    allergens: ["우유"],
    storage: "냉동보관 (-18°C 이하)",
    expiryDays: 545,
    inStock: true,
    image: "https://via.placeholder.com/200x200/A8E6CF/333333?text=메로나"
  },
  {
    id: 28,
    name: "월드콘",
    category: "아이스크림",
    price: 1800,
    weight: "140ml",
    brand: "롯데제과",
    description: "바삭한 콘과 부드러운 아이스크림의 조화",
    origin: "대한민국",
    calories: 285,
    ingredients: ["유크림", "설탕", "밀가루", "초콜릿"],
    allergens: ["우유", "밀", "대두"],
    storage: "냉동보관 (-18°C 이하)",
    expiryDays: 545,
    inStock: true,
    image: "https://via.placeholder.com/200x200/A8E6CF/333333?text=월드콘"
  },
  {
    id: 29,
    name: "붕어싸만코",
    category: "아이스크림",
    price: 1500,
    weight: "150ml",
    brand: "빙그레",
    description: "붕어빵 모양의 팥과 아이스크림",
    origin: "대한민국",
    calories: 240,
    ingredients: ["팥앙금", "밀가루", "유크림", "설탕"],
    allergens: ["우유", "밀"],
    storage: "냉동보관 (-18°C 이하)",
    expiryDays: 545,
    inStock: true,
    image: "https://via.placeholder.com/200x200/A8E6CF/333333?text=붕어싸만코"
  },
  {
    id: 30,
    name: "죠스바",
    category: "아이스크림",
    price: 1000,
    weight: "70ml",
    brand: "롯데제과",
    description: "상어 모양의 딸기맛 아이스바",
    origin: "대한민국",
    calories: 95,
    ingredients: ["정제수", "설탕", "딸기농축액", "구연산"],
    allergens: [],
    storage: "냉동보관 (-18°C 이하)",
    expiryDays: 545,
    inStock: true,
    image: "https://via.placeholder.com/200x200/A8E6CF/333333?text=죠스바"
  },
  {
    id: 31,
    name: "스크류바",
    category: "아이스크림",
    price: 1000,
    weight: "70ml",
    brand: "롯데제과",
    description: "파인애플맛 나선형 아이스바",
    origin: "대한민국",
    calories: 85,
    ingredients: ["정제수", "설탕", "파인애플농축액", "구연산"],
    allergens: [],
    storage: "냉동보관 (-18°C 이하)",
    expiryDays: 545,
    inStock: false,
    image: "https://via.placeholder.com/200x200/A8E6CF/333333?text=스크류바"
  },
  {
    id: 32,
    name: "하겐다즈 바닐라",
    category: "아이스크림",
    price: 7500,
    weight: "473ml",
    brand: "하겐다즈",
    description: "마다가스카르 바닐라로 만든 프리미엄 아이스크림",
    origin: "프랑스",
    calories: 520,
    ingredients: ["유크림", "탈지우유", "설탕", "바닐라빈"],
    allergens: ["우유"],
    storage: "냉동보관 (-18°C 이하)",
    expiryDays: 730,
    inStock: true,
    image: "https://via.placeholder.com/200x200/A8E6CF/333333?text=하겐다즈"
  },

  // 즉석식품 (8개)
  {
    id: 33,
    name: "오뚜기 3분 카레",
    category: "즉석식품",
    price: 1500,
    weight: "200g",
    brand: "오뚜기",
    description: "전자레인지 3분이면 완성되는 간편 카레",
    origin: "대한민국",
    calories: 185,
    ingredients: ["감자", "당근", "양파", "카레분말", "쇠고기"],
    allergens: ["밀", "대두", "쇠고기", "우유"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 365,
    inStock: true,
    image: "https://via.placeholder.com/200x200/DDA0DD/FFFFFF?text=3분카레"
  },
  {
    id: 34,
    name: "햇반 백미밥",
    category: "즉석식품",
    price: 1800,
    weight: "210g",
    brand: "CJ제일제당",
    description: "갓 지은 밥처럼 맛있는 즉석밥",
    origin: "대한민국",
    calories: 315,
    ingredients: ["쌀", "정제수"],
    allergens: [],
    storage: "직사광선을 피하고 상온 보관",
    expiryDays: 270,
    inStock: true,
    image: "https://via.placeholder.com/200x200/DDA0DD/FFFFFF?text=햇반"
  },
  {
    id: 35,
    name: "비비고 왕교자",
    category: "즉석식품",
    price: 8900,
    weight: "455g",
    brand: "CJ제일제당",
    description: "두툼한 피와 꽉 찬 속이 일품인 만두",
    origin: "대한민국",
    calories: 420,
    ingredients: ["돼지고기", "밀가루", "양배추", "부추", "당면"],
    allergens: ["밀", "대두", "돼지고기"],
    storage: "냉동보관 (-18°C 이하)",
    expiryDays: 270,
    inStock: true,
    image: "https://via.placeholder.com/200x200/DDA0DD/FFFFFF?text=비비고만두"
  },
  {
    id: 36,
    name: "풀무원 얇은피만두",
    category: "즉석식품",
    price: 7500,
    weight: "400g",
    brand: "풀무원",
    description: "얇고 바삭한 피가 특징인 만두",
    origin: "대한민국",
    calories: 380,
    ingredients: ["돼지고기", "밀가루", "양배추", "두부"],
    allergens: ["밀", "대두", "돼지고기"],
    storage: "냉동보관 (-18°C 이하)",
    expiryDays: 270,
    inStock: true,
    image: "https://via.placeholder.com/200x200/DDA0DD/FFFFFF?text=얇은피만두"
  },
  {
    id: 37,
    name: "동원 참치캔",
    category: "즉석식품",
    price: 3500,
    weight: "150g",
    brand: "동원F&B",
    description: "고급 참다랑어로 만든 참치캔",
    origin: "대한민국",
    calories: 245,
    ingredients: ["참치", "정제수", "식물성유지", "소금"],
    allergens: ["생선"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 1095,
    inStock: true,
    image: "https://via.placeholder.com/200x200/DDA0DD/FFFFFF?text=참치캔"
  },
  {
    id: 38,
    name: "스팸 클래식",
    category: "즉석식품",
    price: 5500,
    weight: "200g",
    brand: "CJ제일제당",
    description: "돼지고기와 햄의 풍미가 살아있는 캔햄",
    origin: "대한민국",
    calories: 520,
    ingredients: ["돼지고기", "전분", "소금", "설탕", "아질산나트륨"],
    allergens: ["돼지고기"],
    storage: "직사광선을 피하고 서늘한 곳에 보관",
    expiryDays: 1095,
    inStock: true,
    image: "https://via.placeholder.com/200x200/DDA0DD/FFFFFF?text=스팸"
  },
  {
    id: 39,
    name: "오뚜기 진짬뽕",
    category: "즉석식품",
    price: 2500,
    weight: "280g",
    brand: "오뚜기",
    description: "얼큰한 국물의 즉석 짬뽕",
    origin: "대한민국",
    calories: 320,
    ingredients: ["면", "해물", "양배추", "고춧가루"],
    allergens: ["밀", "대두", "조개류", "새우", "오징어"],
    storage: "냉동보관 (-18°C 이하)",
    expiryDays: 270,
    inStock: true,
    image: "https://via.placeholder.com/200x200/DDA0DD/FFFFFF?text=진짬뽕"
  },
  {
    id: 40,
    name: "삼양 불닭소스",
    category: "즉석식품",
    price: 3800,
    weight: "200g",
    brand: "삼양",
    description: "불닭볶음면의 매운맛을 담은 만능 소스",
    origin: "대한민국",
    calories: 180,
    ingredients: ["고춧가루", "설탕", "간장", "마늘", "참기름"],
    allergens: ["밀", "대두", "참깨"],
    storage: "개봉 후 냉장보관",
    expiryDays: 365,
    inStock: true,
    image: "https://via.placeholder.com/200x200/DDA0DD/FFFFFF?text=불닭소스"
  }
];

// ============ API 엔드포인트 ============

// 기본 페이지 - API 정보
app.get('/', (req, res) => {
  res.json({
    message: '🛒 마트 식품 API에 오신 것을 환영합니다!',
    version: '1.1.0',
    totalProducts: products.length,
    imageSize: '200x200px (모든 상품 동일)',
    endpoints: {
      '모든 상품 조회': 'GET /api/products',
      '상품 ID로 조회': 'GET /api/products/:id',
      '카테고리별 조회': 'GET /api/products/category/:category',
      '브랜드별 조회': 'GET /api/products/brand/:brand',
      '상품 검색': 'GET /api/search?q=검색어',
      '재고 있는 상품': 'GET /api/products/in-stock',
      '가격 범위 조회': 'GET /api/products/price?min=1000&max=5000',
      '카테고리 목록': 'GET /api/categories',
      '브랜드 목록': 'GET /api/brands',
      '랜덤 상품 추천': 'GET /api/random'
    }
  });
});

// 모든 상품 조회
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    count: products.length,
    data: products
  });
});

// 상품 ID로 조회
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: `ID ${id}인 상품을 찾을 수 없습니다.`
    });
  }
  
  res.json({
    success: true,
    data: product
  });
});

// 카테고리별 조회
app.get('/api/products/category/:category', (req, res) => {
  const category = decodeURIComponent(req.params.category);
  const filtered = products.filter(p => 
    p.category.toLowerCase() === category.toLowerCase()
  );
  
  if (filtered.length === 0) {
    return res.status(404).json({
      success: false,
      message: `'${category}' 카테고리의 상품이 없습니다.`,
      availableCategories: [...new Set(products.map(p => p.category))]
    });
  }
  
  res.json({
    success: true,
    category: category,
    count: filtered.length,
    data: filtered
  });
});

// 브랜드별 조회
app.get('/api/products/brand/:brand', (req, res) => {
  const brand = decodeURIComponent(req.params.brand);
  const filtered = products.filter(p => 
    p.brand.toLowerCase() === brand.toLowerCase()
  );
  
  if (filtered.length === 0) {
    return res.status(404).json({
      success: false,
      message: `'${brand}' 브랜드의 상품이 없습니다.`,
      availableBrands: [...new Set(products.map(p => p.brand))]
    });
  }
  
  res.json({
    success: true,
    brand: brand,
    count: filtered.length,
    data: filtered
  });
});

// 상품 검색
app.get('/api/search', (req, res) => {
  const query = req.query.q;
  
  if (!query) {
    return res.status(400).json({
      success: false,
      message: '검색어를 입력해주세요. 예: /api/search?q=새우'
    });
  }
  
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.brand.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );
  
  res.json({
    success: true,
    query: query,
    count: filtered.length,
    data: filtered
  });
});

// 재고 있는 상품만 조회
app.get('/api/products/in-stock', (req, res) => {
  const inStock = products.filter(p => p.inStock);
  
  res.json({
    success: true,
    count: inStock.length,
    data: inStock
  });
});

// 가격 범위로 조회
app.get('/api/products/price', (req, res) => {
  const min = parseInt(req.query.min) || 0;
  const max = parseInt(req.query.max) || 100000;
  
  const filtered = products.filter(p => p.price >= min && p.price <= max);
  
  res.json({
    success: true,
    priceRange: { min, max },
    count: filtered.length,
    data: filtered.sort((a, b) => a.price - b.price)
  });
});

// 카테고리 목록
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  const categoryInfo = categories.map(cat => ({
    name: cat,
    count: products.filter(p => p.category === cat).length
  }));
  
  res.json({
    success: true,
    count: categories.length,
    data: categoryInfo
  });
});

// 브랜드 목록
app.get('/api/brands', (req, res) => {
  const brands = [...new Set(products.map(p => p.brand))];
  const brandInfo = brands.map(brand => ({
    name: brand,
    count: products.filter(p => p.brand === brand).length
  }));
  
  res.json({
    success: true,
    count: brands.length,
    data: brandInfo.sort((a, b) => b.count - a.count)
  });
});

// 랜덤 상품 추천
app.get('/api/random', (req, res) => {
  const count = parseInt(req.query.count) || 1;
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.min(count, products.length));
  
  res.json({
    success: true,
    message: '오늘의 랜덤 추천 상품입니다! 🎲',
    count: selected.length,
    data: selected
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`✅ 마트 API 서버가 포트 ${PORT}에서 실행 중입니다`);
  console.log(`📦 총 ${products.length}개의 상품이 등록되어 있습니다`);
  console.log(`🖼️ 모든 상품 이미지: 200x200px`);
});
