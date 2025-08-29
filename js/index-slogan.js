// index.html 애니메이션을 위한 JavaScript 파일

// GSAP와 ScrollTrigger CDN에서 로드
let gsap, ScrollTrigger;

// 즉시 실행되는 초기화 함수
function immediateInit() {
  console.log('즉시 초기화 실행...');
  
  // 모든 문장을 즉시 보이게 설정
  const sentences = document.querySelectorAll('.main-headline-3 .__sentence');
  sentences.forEach(sentence => {
    sentence.style.opacity = '1';
    sentence.style.display = 'block';
  });
  
  // 키워드 리스트는 숨김
  const listElement = document.querySelector('.main-headline-3 .__list');
  if (listElement) {
    listElement.style.opacity = '0';
  }
  
  // 설명 텍스트도 보이게 설정
  const descElements = document.querySelectorAll('.main-headline-3 .__desc .main-title-3');
  descElements.forEach(desc => {
    desc.style.opacity = '1';
  });
  
  // 절대 위치 키워드들도 보이게 설정
  const absKeywords = document.querySelectorAll('.main-headline-3 .__keyword[data-dir="from"]');
  absKeywords.forEach(keyword => {
    keyword.style.opacity = '1';
  });
  
  console.log('즉시 초기화 완료');
}

// 라이브러리 로드 확인
function checkLibraries() {
  gsap = window.gsap;
  ScrollTrigger = window.ScrollTrigger;
  
  if (gsap && ScrollTrigger) {
    console.log('GSAP와 ScrollTrigger 로드됨');
    gsap.registerPlugin(ScrollTrigger);
    initAnimations();
  } else {
    console.log('GSAP나 ScrollTrigger가 로드되지 않음, 기본 애니메이션 사용');
    initBasicAnimations();
  }
}

// 기본 애니메이션 (라이브러리 없을 때)
function initBasicAnimations() {
  console.log('기본 애니메이션 초기화...');
  
  // 초기 상태 설정
  const sentences = document.querySelectorAll('.main-headline-3 .__sentence');
  const keywords = document.querySelectorAll('.main-headline-3 .__list .__keyword');
  const listElement = document.querySelector('.main-headline-3 .__list');
  
  // 문장들을 보이게 설정
  sentences.forEach(sentence => {
    sentence.style.opacity = '1';
  });
  
  // 키워드 리스트는 숨김
  if (listElement) {
    listElement.style.opacity = '0';
  }
  
  // 키워드들의 초기 위치 설정
  keywords.forEach(keyword => {
    keyword.style.left = '0px';
  });
  
  // Intersection Observer를 사용한 간단한 애니메이션
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });
  
  // 애니메이션 대상 요소들
  const animatedElements = document.querySelectorAll('.main-headline-3 .__sentence, .main-headline-3 .__keyword');
  animatedElements.forEach(el => observer.observe(el));
  
  // 키워드 클릭 이벤트
  keywords.forEach(keyword => {
    keyword.addEventListener('click', handleKeywordClick);
  });
  
  // 간단한 스크롤 애니메이션
  initSimpleScrollAnimation();
}

// 간단한 스크롤 애니메이션
function initSimpleScrollAnimation() {
  console.log('간단한 스크롤 애니메이션 초기화...');
  
  const headlineSection = document.querySelector('.main-headline-3');
  const txtElement = headlineSection.querySelector('.__txt');
  const listElement = headlineSection.querySelector('.__list');
  const sentences = headlineSection.querySelectorAll('.__sentence');
  const keywords = headlineSection.querySelectorAll('.main-headline-3 .__list .__keyword');
  
  if (!headlineSection || !txtElement || !listElement) {
    console.warn('필요한 요소를 찾을 수 없습니다.');
    return;
  }
  
  // 초기 상태 설정
  txtElement.style.opacity = '1';
  listElement.style.opacity = '0';
  keywords.forEach(keyword => {
    keyword.style.left = '0px';
  });
  
  window.addEventListener('scroll', function() {
    const rect = headlineSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      
      // .__txt의 opacity를 스크롤에 따라 0으로
      if (txtElement) {
        const opacity = Math.max(0, 1 - (progress * 2));
        txtElement.style.opacity = opacity;
        
        // 각 문장을 순차적으로 투명하게
        sentences.forEach((sentence, index) => {
          if (progress > (index + 1) * 0.2) {
            const sentenceOpacity = Math.max(0, 1 - ((progress - (index + 1) * 0.2) * 5));
            sentence.style.opacity = sentenceOpacity;
          }
        });
      }
      
      // .__list의 .__keyword를 left:42px로 이동
      if (listElement && progress > 0.5) {
        listElement.style.opacity = '1';
        
        const keywordProgress = (progress - 0.5) * 2;
        keywords.forEach((keyword, index) => {
          const delay = index * 0.2;
          if (keywordProgress > delay) {
            const moveProgress = Math.min(1, (keywordProgress - delay) * 3);
            const leftValue = moveProgress * 42;
            keyword.style.left = leftValue + 'px';
            
            if (moveProgress >= 1) {
              keyword.classList.add('slide-in');
            }
          }
        });
      }
    }
  });
}

// 키워드 클릭 이벤트 처리
function handleKeywordClick(event) {
  const keyword = event.currentTarget;
  const index = keyword.dataset.index;
  
  // 모든 키워드에서 active 클래스 제거
  document.querySelectorAll('.main-headline-3 .__keyword').forEach(k => {
    k.classList.remove('__active');
  });
  
  // 클릭된 키워드에 active 클래스 추가
  keyword.classList.add('__active');
  
  console.log(`키워드 ${index} 클릭됨`);
}

// GSAP 애니메이션 초기화
function initAnimations() {
  console.log('GSAP 애니메이션 초기화...');
  
  // main-headline-3 애니메이션
  initMainHeadline3Animation();
  
  // 기타 애니메이션들
  initOtherAnimations();
}

// main-headline-3 섹션 스크롤 애니메이션
function initMainHeadline3Animation() {
  console.log('main-headline-3 애니메이션 초기화...');
  
  const headlineSection = document.querySelector('.main-headline-3');
  if (!headlineSection) {
    console.warn('.main-headline-3 섹션을 찾을 수 없습니다.');
    return;
  }
  
  const txtElement = headlineSection.querySelector('.__txt');
  const listElement = headlineSection.querySelector('.__list');
  const sentences = headlineSection.querySelectorAll('.__sentence');
  const keywords = headlineSection.querySelectorAll('.main-headline-3 .__list .__keyword');
  
  if (!txtElement || !listElement) {
    console.warn('.__txt 또는 .__list 요소를 찾을 수 없습니다.');
    return;
  }
  
  console.log('찾은 요소들:', {
    sentences: sentences.length,
    keywords: keywords.length
  });
  
  // 초기 상태 설정
  gsap.set(txtElement, { opacity: 1 });
  gsap.set(listElement, { opacity: 0 });
  gsap.set(keywords, { left: 0 });
  
  // 스크롤 트리거 생성
  ScrollTrigger.create({
    trigger: headlineSection,
    start: 'top top',
    end: 'bottom bottom',
    pin: true,
    pinSpacing: false,
    onUpdate: function(self) {
      const progress = self.progress;
      
      // .__txt의 opacity를 스크롤에 따라 0으로
      if (txtElement) {
        const opacity = Math.max(0, 1 - (progress * 2)); // progress가 0.5에 도달하면 opacity가 0
        gsap.set(txtElement, { opacity: opacity });
        
        // 각 문장을 순차적으로 투명하게
        sentences.forEach((sentence, index) => {
          if (progress > (index + 1) * 0.2) {
            const sentenceOpacity = Math.max(0, 1 - ((progress - (index + 1) * 0.2) * 5));
            gsap.set(sentence, { opacity: sentenceOpacity });
          }
        });
      }
      
      // .__list의 .__keyword를 left:42px로 이동
      if (listElement && progress > 0.5) {
        gsap.set(listElement, { opacity: 1 });
        
        const keywordProgress = (progress - 0.5) * 2; // 0.5 이후부터 시작
        keywords.forEach((keyword, index) => {
          const delay = index * 0.2;
          if (keywordProgress > delay) {
            const moveProgress = Math.min(1, (keywordProgress - delay) * 3);
            const leftValue = moveProgress * 42; // 0에서 42px까지
            gsap.set(keyword, { left: leftValue + 'px' });
            
            if (moveProgress >= 1) {
              keyword.classList.add('slide-in');
            }
          }
        });
      }
    }
  });
  
  console.log('main-headline-3 애니메이션 설정 완료');
}

// 기타 애니메이션들
function initOtherAnimations() {
  console.log('기타 애니메이션 초기화...');
  
  // 문장 애니메이션
  const sentences = document.querySelectorAll('.main-headline-3 .__sentence');
  sentences.forEach((sentence, index) => {
    gsap.fromTo(sentence, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        delay: index * 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sentence,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
  
  // 키워드 애니메이션
  const keywords = document.querySelectorAll('.main-headline-3 .__keyword[data-dir="from"]');
  keywords.forEach((keyword, index) => {
    gsap.fromTo(keyword,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: keyword,
          start: 'top 70%',
          end: 'top 30%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

// 즉시 실행
immediateInit();

// 페이지 로드 후 초기화
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM 로드됨, 애니메이션 초기화 중...');
  immediateInit();
  checkLibraries();
});

// 페이지 로드 후에도 시도
window.addEventListener('load', function() {
  console.log('페이지 로드됨, 애니메이션 확인 중...');
  immediateInit();
  checkLibraries();
});

// 라이브러리 로드 대기
setTimeout(checkLibraries, 1000);
