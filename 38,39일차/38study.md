# JWT & Authorization 예외 처리 정리

## 1. Authorization 헤더란?

- HTTP 요청 시 인증 정보를 서버에 전달하기 위한 헤더
- 주로 JWT(Json Web Token) 또는 Access Token을 전달할 때 사용

형식:

```
Authorization: Bearer <토큰값>
```

---

# 2. JWT 예외 처리

JWT를 검증할 때 대표적으로 발생하는 에러

## 1️⃣ TokenExpiredError

- 유효기간이 지난 토큰
- 만료된 access token

## 2️⃣ JsonWebTokenError

- 변조된 토큰
- 형식이 잘못된 토큰
- 서명이 일치하지 않는 토큰

---

# 3. try - catch 문

## 개념

- try 블록에서 코드를 실행
- 실행 중 에러가 발생하면 즉시 중단
- catch 블록으로 이동하여 에러 처리

```jsx
try {
  const decoded = jwt.verify(token, secretKey)
} catch (err) {
  console.log(err)
}
```

---

# 4. 에러 객체 (Error Object)

- JavaScript가 기본적으로 제공하는 내장 객체
- 에러 발생 시 자동 생성됨

대표 속성:

- err.name → 에러 이름
- err.message → 에러 메시지
- err.stack → 에러 발생 위치

예시:

```jsx
catch (err) {
  console.log(err.name)
  console.log(err.message)
}
```

---

# 5. throw 연산자

- 강제로 에러를 발생시키는 연산자
- 사용자 정의 에러를 만들 수 있음

```jsx
throw new Error('잘못된 요청입니다')
```

또는

```jsx
throw new SyntaxError('문법 오류 발생')
```

---

# 핵심 정리

- Authorization 헤더에 JWT를 담아서 보낸다
- jwt.verify()에서 에러가 발생할 수 있다
- 대표적인 에러는 TokenExpiredError, JsonWebTokenError
- try-catch로 에러를 분기 처리한다
- throw를 사용하면 직접 에러

