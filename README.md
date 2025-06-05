## 프로젝트 개요


# 💻 Vue.js + Pinia + MariaDB 개발 규칙

## 📁 폴더 구조
src/
├── assets/ # 이미지, 아이콘 등 정적 리소스
├── components/ # 공통 Vue 컴포넌트
├── pages/ # 라우트 단위 뷰 페이지
├── stores/ # Pinia 상태 관리
├── services/ # API 통신 모듈
├── utils/ # 헬퍼 함수
├── router/ # Vue Router 설정
└── App.vue / main.js

## ✨ 코드 규칙
- Vue 3 Composition API 사용
- 컴포넌트 이름은 PascalCase (`TripForm.vue`, `CustomerList.vue`)
- 폴더 및 파일명은 kebab-case (`trip-form.vue`)
- Pinia 스토어는 `useXStore()` 네이밍 사용

## 🎯 커밋 메시지 컨벤션 (Conventional Commits)
- `feat`: 새 기능 추가  
- `fix`: 버그 수정  
- `refactor`: 코드 구조 변경 (기능 변화 없음)  
- `docs`: 문서 변경  
- `style`: 코드 스타일 (세미콜론, 들여쓰기 등)  
- `test`: 테스트 코드 추가  
- `chore`: 빌드, 패키지, 의존성 작업  

예시:  
feat: 여행 요청 입력 폼 구현
fix: 일정표에서 날짜 오류 수정


