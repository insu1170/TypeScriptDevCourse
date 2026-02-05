# 25일차 쿠키 & JWT

## 토큰 (Token)

- 인증(Authentication)과 식별(Identification)을 위해 사용되는 문자열 데이터입니다.

사용자는 토큰을 통해 "내가 누구인지"를 서버에 증명합니다.

---

## JWT (JSON Web Token)

JSON 형태의 데이터를 안전하게 전송하기 위한 토큰 방식입니다.

 **토큰을 가진 사용자가 자신을 증명하는 수단**으로 사용됩니다.

### 장점

- **보안성이 높음** → 서명을 통해 데이터 위변조 여부를 확인할 수 있음
- **무상태(Stateless) 서버 구조** → 서버가 로그인 상태를 저장하지 않아도 됨
- **서버 부담 감소** → 세션 저장소가 필요 없음
- **확장성 좋음** → 토큰 발행 서버를 별도로 둘 수도 있음 (예: 인증 서버)

---

## JWT 구조

JWT는 크게 3가지로 구성됩니다.

### 1️⃣ Header

- 어떤 알고리즘으로 서명했는지 정보 포함
- 토큰 타입(JWT) 명시

### 2️⃣ Payload

- 사용자 정보가 들어가는 영역
- 예: 이름, 이메일, 권한 등

**비밀번호 같은 민감 정보는 X**

### 3️⃣ Signature (서명)

- Header + Payload를 비밀 키로 암호화하여 생성
- Payload가 변경되면 서명이 달라지므로 위변조를 감지할 수 있음

 따라서 서버는 JWT를 **신뢰하고 사용할 수 있다.**

---

## JWT 사용 예시

```jsx
const jwt = require('jsonwebtoken');

// 토큰 생성
const token = jwt.sign({ foo: 'bar' }, 'shhhh');

// 토큰 검증
const decoded = jwt.verify(token, 'shhhh');

console.log(decoded);
// { foo: 'bar', iat: 1770280773 }

```

- **foo** → 저장된 데이터
- **iat** → 토큰 발행 시간

### ⏰ 토큰 만료 시간 설정

```jsx
const token = jwt.sign(
  {
    email: loginUser.email,
    name: loginUser.name
  },
  process.env.PRIVATE_KEY,
  { expiresIn: '5m' } // 5분
);

```

`expiresIn` 옵션으로 토큰 유효 시간을 설정할 수 있습니다.

---

## .env (환경 변수)

외부 유출 시 위험한 정보를 코드에 직접 작성하지 않고 **환경 변수로 관리**합니다.

### ✔ 대표적인 예

- 포트 번호
- DB 계정
- API 키
- JWT 비밀 키

👉 보통 **프로젝트 최상위 경로**에 `.env` 파일을 둡니다.

### 사용 방법

```jsx
require('dotenv').config();

app.listen(process.env.PORT);

const token = jwt.sign({ foo: 'bar' }, process.env.PRIVATE_KEY);

```

`process.env.변수명` 으로 접근 가능

`.env` 파일은 반드시 `.gitignore`에 추가

---

## Cookie Parser

쿠키를 쉽게 읽고 사용할 수 있도록 도와주는 Express 미들웨어입니다.

### 주요 옵션

- **httpOnly**
    
    → JavaScript에서 접근 불가 (브라우저 API 호출만 가능)
    
    → **XSS 공격 방어에 효과적**
    
- **secure**
    
    → HTTPS에서만 쿠키 전송
    

---

## HTTP vs HTTPS

- **HTTP** → 데이터가 암호화되지 않음 (보안 취약)
- **HTTPS** → SSL/TLS 기반 암호화 통신 (보안 강화)

 로그인 및 인증 정보는 반드시 **HTTPS 환경에서 사용**해야 합니다.

---

## JWT 인증 / 인가 절차

### 1단계: 로그인

사용자가 아이디와 비밀번호로 로그인 요청

### 2단계: 토큰 발급

서버가 사용자 정보를 확인 후 JWT 생성하여 전달

 보통 아래 위치에 저장:

- Authorization 헤더
- 또는 httpOnly 쿠키

### 3단계: 요청 시 토큰 전달

클라이언트가 API 요청할 때 JWT를 함께 전송

### 4단계: 토큰 검증

서버가 서명을 확인하여 토큰이 유효한지 검사

- 변조 여부 확인
- 만료 시간 확인

### 5단계: 인가 (Authorization)

토큰의 Payload 정보를 기반으로 **접근 권한 판단**

예:

- 관리자만 접근 가능
- 로그인 사용자만 접근 가능

---

## 핵심 정리

👉 **인증(Authentication)** → "너 누구야?" 확인

👉 **인가(Authorization)** → "이거 할 권한 있어?" 확인

✔ JWT는 **서버가 상태를 저장하지 않아도 되는 인증 방식**

✔ Payload에는 민감 정보를 넣지 말 것

✔ 비밀 키는 반드시 `.env`로 관리

✔ 가능하면 httpOnly + HTTPS 사용

---

원한다면 👉 **"세션 vs JWT 차이"**, **"Access / Refresh Token 구조"**, **"면접에서 좋아하는 JWT 설명"**도 정리해 드릴게요.