# express-generator 구조 요약

express-generator는 **Express 서버의 기본 구조를 자동 생성**해주는 도구로, 빠른 초기 세팅과 유지보수에 도움을 준다.

---

## 주요 폴더 및 파일

### bin/www

- 웹 서버 실행 파일
- 포트 설정 및 HTTP 서버 생성

### app.js

- Express 앱 생성
- 미들웨어 등록
- 라우터 연결

👉 서버의 중심 역할

### routes/

- URL 경로를 처리하는 라우터 파일 관리
- 요청을 적절한 로직으로 연결

### public/

- 이미지, CSS, JS 같은 정적 파일 저장
- 그대로 브라우저에 제공됨

### views/

- 서버 렌더링 템플릿 파일
- 프론트 분리 구조에서는 사용 빈도 낮음

### node_modules/

- 설치된 npm 패키지 저장 (수정 ❌, git 제외)

### package.json

- 프로젝트 정보 및 의존성 관리

### .env

- 포트, DB 비밀번호, JWT 키 등 환경변수 저장
- 반드시 git 제외