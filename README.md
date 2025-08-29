# Slogan 애니메이션 프로젝트

이 프로젝트는 index.html의 슬로건 애니메이션을 위한 웹 애니메이션 프로젝트입니다.

## 프로젝트 구조

```
slogan/
├── css/
│   ├── main.css          # 기존 메인 CSS 파일
│   └── index-slogan.css  # 슬로건 애니메이션 전용 CSS
├── js/
│   ├── main.js           # 기존 메인 JavaScript 파일
│   └── index-slogan.js   # 슬로건 애니메이션 전용 JavaScript
├── movie/                 # 비디오 파일들
│   ├── mainSlogan_01.mp4
│   ├── mainSlogan_02.mp4
│   ├── mainSlogan_03.mp4
│   ├── main01.png
│   ├── main02.png
│   └── main03.png
├── index.html            # 메인 HTML 파일
├── test.html             # GSAP 테스트 페이지
└── README.md             # 프로젝트 설명서
```

## 주요 기능

### 1. 슬로건 애니메이션
- 스크롤 기반 텍스트 애니메이션
- 키워드 하이라이트 효과
- 문자별 순차 애니메이션
- 반응형 디자인 지원

### 2. 비디오 배경
- 3개의 메인 슬로건 비디오
- 모바일/데스크톱 최적화
- 자동 재생 및 루프

### 3. 인터랙티브 요소
- 키워드 클릭 이벤트
- 호버 효과
- 스크롤 기반 애니메이션

## 사용법

### 1. 기본 실행
```bash
# 웹 서버 실행 (예: Python)
python -m http.server 8000

# 또는 Node.js
npx serve .
```

### 2. 파일 확인
- `index.html` - 메인 페이지
- `test.html` - GSAP 라이브러리 테스트 페이지

## 기술 스택

- **HTML5** - 마크업
- **CSS3** - 스타일링 및 애니메이션
- **JavaScript (ES6+)** - 로직 및 애니메이션 제어
- **GSAP** - 고급 애니메이션 라이브러리
- **ScrollTrigger** - 스크롤 기반 애니메이션

## 애니메이션 특징

### 1. 성능 최적화
- `will-change` 속성 사용
- `transform3d` 하드웨어 가속
- `requestAnimationFrame` 활용

### 2. 반응형 지원
- 모바일/태블릿/데스크톱 최적화
- 터치 디바이스 지원
- 다양한 화면 크기 대응

### 3. 접근성
- 키보드 네비게이션 지원
- 스크린 리더 호환
- 고대비 모드 지원

## 커스터마이징

### 1. 애니메이션 속도 조정
```css
/* CSS에서 transition-duration 수정 */
#mainSlogan .__sentence {
    transition: opacity 0.8s ease-out; /* 0.8초를 원하는 값으로 변경 */
}
```

### 2. 애니메이션 효과 변경
```javascript
// JavaScript에서 ease 함수 변경
gsap.to(element, {
    duration: 0.8,
    ease: 'power3.out' // 다른 ease 함수 사용
});
```

### 3. 색상 테마 변경
```css
/* CSS에서 색상 변수 수정 */
#mainSlogan .__keyword.__active {
    color: #your-color; /* 원하는 색상으로 변경 */
}
```

## 문제 해결

### 1. 애니메이션이 작동하지 않는 경우
- 브라우저 콘솔에서 오류 메시지 확인
- GSAP 라이브러리가 제대로 로드되었는지 확인
- `test.html` 페이지로 라이브러리 상태 확인

### 2. 성능 문제
- 개발자 도구의 Performance 탭에서 병목 지점 확인
- 애니메이션 복잡도 줄이기
- `will-change` 속성 최적화

### 3. 모바일 호환성
- 터치 이벤트 지원 확인
- 모바일 브라우저 테스트
- 반응형 CSS 미디어 쿼리 확인

## 브라우저 지원

- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+
- **모바일 브라우저** iOS Safari 12+, Chrome Mobile 60+

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 문의사항

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.
