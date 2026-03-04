# 비동기 처리 핵심 정리

## 1️⃣ 비동기란?

- 시간이 걸리는 작업을 기다리지 않고 다음 코드를 먼저 실행하는 방식
- 예: setTimeout, DB Query, 파일 읽기, API 요청

---

## 2️⃣ 비동기 처리 방식 흐름

### 1. 콜백 (Callback)

"작업 끝나면 이 함수 실행해줘"

### 2. Promise

- resolve → 성공
- reject → 실패
- 비동기 결과를 객체로 관리

### 3. async / await

- Promise를 더 쉽게 쓰기 위한 문법
- 동기 코드처럼 보이게 작성 가능
- 내부적으로는 Promise 기반

```jsx
try {
  const result = await someAsync();
} catch (err) {
  console.error(err);
}
```

- async → 함수가 Promise를 반환
- await → Promise가 끝날 때까지 기다리고 결과 반환

---

# mysql2: 콜백 vs Promise Wrapper

## 1️⃣ 콜백 기반

```jsx
const mysql = require('mysql2');

conn.query(sql, (err, results) => {
  if (err) return;
  console.log(results);
});
```

- 콜백 함수 전달
- 코드 중첩 가능성 있음
- async/await 사용 불가

---

## 2️⃣ Promise Wrapper

```jsx
const mysql = require('mysql2/promise');

const [rows] = await conn.query(sql);
```

- Promise 반환
- async/await 사용 가능
- try/catch로 에러 처리
- 가독성 좋음

---

- mysql2에서는 실무에서 Promise Wrapper가 기본