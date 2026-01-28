# 14일차 데이터 처리 & 네이밍 규칙

## GET 요청에서 데이터 받기

### 1. URL 파라미터 (Path Parameter)

- URL 경로 자체에 포함된 값
- `req.params`로 접근

```jsx
app.get('/users/:id', (req, res) => {
  console.log(req.params.id);
  res.send(`User ID: ${req.params.id}`);
});

```

요청 예시:

```
GET /users/3

```

---

### 2. 쿼리 스트링 (Query String)

- URL 뒤에 `?key=value` 형태로 전달되는 데이터
- `query` 또는 `queryString`이라고 부름
- `req.query`로 접근

```jsx
app.get('/products', (req, res) => {
  console.log(req.query);
  res.json(req.query);
});

```

요청 예시:

```
GET /products?category=shoes&page=2

```

결과:

```json
{
  "category": "shoes",
  "page": "2"
}

```

---

## 배열 비구조화 할당 (Destructuring Assignment)

- 대입 연산자를 이용해 배열의 값을 변수로 분해해서 할당

```jsx
const arr = [10, 20, 30];
const [a, b, c] = arr;

console.log(a); // 10
console.log(b); // 20

```

---

## 디렉토리 네이밍 규칙

- 영어 소문자 사용
- 단어 구분은 하이픈() 사용

예시:

```
user-api
product-service

```

---

## 네이밍 케이스 종류

### 1. 케밥 케이스 (kebab-case)

- 단어 사이를 하이픈()으로 연결
- 주로 URL, 디렉토리 이름에 사용

```
demo-api

```

---

### 2. 카멜 케이스 (camelCase)

- 첫 단어는 소문자, 이후 단어는 대문자
- JavaScript 변수, 함수명에 주로 사용

```jsx
demoApi

```

---

### 3. 스네이크 케이스 (snake_case)

- 단어 사이를 언더바(`_`)로 연결
- DB 컬럼명이나 일부 언어에서 사용

```
demo_api

```

---

## Map 자료형

- `key-value` 구조의 자료형
- 객체와 달리 **key로 모든 타입 사용 가능**

### 선언 및 사용

```jsx
const map = new Map();

map.set('name', 'insu');
map.set(1, 'number key');

console.log(map.get('name')); // insu
console.log(map.get(1)); // number key

```

- `set(key, value)` → 데이터 추가
- `get(key)` → 데이터 조회
