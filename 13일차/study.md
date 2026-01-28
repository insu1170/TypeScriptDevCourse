# 13일차

## Express

```jsx
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello');
  // res.json({}); // ❌ 같은 요청에서 두 번 응답하면 안 됨
});

app.listen(3001);

```

### res.send

- 문자열, HTML, 객체 등 다양한 타입을 응답으로 보낼 수 있음
- 브라우저에 그대로 출력됨

### res.json

- JSON 형태로 응답
- 내부적으로 `Content-Type: application/json` 설정됨

> ⚠️ 하나의 요청(req)에 대해 응답(res)은 한 번만 보낼 수 있음
> 

---

## 라우팅 & params

```jsx
app.get('/products/:n', (req, res) => {
  console.log(req.params); // { n: '값' }
  res.send(req.params.n);
});

```

- `:n` → **URL 파라미터**
- `req.params` 객체에 담김
- 항상 **문자열(string)** 로 들어옴

예시:

```
GET /products/3

req.params // n:3
```

---

## JSON (JavaScript Object Notation)

- 자바스크립트 객체 표기법을 기반으로 한 **데이터 교환 포맷**
- 서버 ↔ 클라이언트 통신에서 가장 많이 사용됨

```json
{
  "id": 1,
  "name": "apple",
  "price": 1000
}

```

### 특징

- key는 항상 문자열
- value: string, number, boolean, array, object, null 가능
- 함수, undefined 불가

---