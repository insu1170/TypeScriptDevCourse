# 15일차 Map & Express 구조

## Map 자료형

- `Map`은 **key-value** 구조의 자료형
- value에는 **객체, 배열, 함수 등 모든 타입 저장 가능**

```jsx
const a = new Map();
const b = { a: '1', b: '2' };

a.set(1, b);

```

- `set(key, value)` → 값 저장
- `get(key)` → 값 조회

---

## Express에서 Map 활용

### Map 값 그대로 응답

```jsx
app.get('/', (req, res) => {
  res.json(a.get(1));
});

```

### Map에서 가져온 객체 수정 후 응답

```jsx
app.get('/', (req, res) => {
  const c = a.get(1);
  c.id = 'id';
  res.json(c);
});

```

---

## Express란?

- Node.js의 기본 `http` 모듈을 **확장**한 웹 프레임워크
- 서버 개발을 **더 쉽고 편리하게** 만들어 줌

### Express가 제공하는 것

- 라우팅 (GET, POST 등)
- 미들웨어 구조
- 요청(Request) / 응답(Response) 객체 추상화

---

## 웹 프레임워크란?

> 내가 만들고 싶은 웹 서비스를 구현하는 데 필요한
> 
> 
> **구조와 도구를 미리 제공하는 틀**
> 
- Express는 대표적인 **웹 프레임워크**
- 라우팅, 미들웨어, 서버 설정을 하나의 구조 안에서 관리

---

## Express 구조

### www 폴더

- 기본적인 **서버 실행 및 포트 설정 파일** 존재
- 실제 서버를 실행하는 진입점 역할

### app.js

- 애플리케이션의 핵심 설정 파일
- 미들웨어 등록
- 라우터 연결

> 미들웨어: 요청(req)과 응답(res) 사이에서 동작하는 함수
> 

---

## 함수 생성 방법

### 1. 일반 함수

```jsx
function sum(a, b) {
  return a + b;
}

```

### 2. 화살표 함수

```jsx
const sum = (a, b) => a + b;

```

- 화살표 함수는 `this` 바인딩이 다름
- 콜백, 미들웨어에서 자주 사용됨