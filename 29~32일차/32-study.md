# 32일차

## LEFT JOIN

```sql
SELECT *
FROM books
LEFT JOIN category
ON books.category_id = category.id;
```

### LEFT JOIN이란?

- 첫 번째 테이블(왼쪽 테이블)을 기준으로
- 두 번째 테이블(오른쪽 테이블)에서 조건에 맞는 데이터를 붙이는 방식

### 동작 방식

왼쪽 테이블(A)

+

오른쪽 테이블(B)에서 일치하는 데이터

+

일치하지 않으면 B는 NULL

### 특징

- 왼쪽 테이블 데이터는 무조건 모두 조회됨
- 오른쪽 테이블은 매칭되는 데이터만 붙음

---

## DATE_ADD

```sql
SELECT DATE_ADD('2024-01-01', INTERVAL 1 MONTH);
```

### 설명

- 기준 날짜에 특정 기간을 더하는 함수
- YEAR, MONTH, DAY 등 다양한 단위 사용 가능

예시

- 1년 추가 → INTERVAL 1 YEAR
- 1개월 추가 → INTERVAL 1 MONTH
- 7일 추가 → INTERVAL 7 DAY

---

## DATE_SUB

```sql
SELECT DATE_SUB(NOW(), INTERVAL 1 MONTH);
```

### 설명

- 기준 날짜에서 특정 기간을 빼는 함수
- 최근 1개월 데이터 조회할 때 자주 사용됨

예시

```sql
SELECT *
FROM books
WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW();
```

---

## LIMIT & OFFSET

### LIMIT

- 가져올 데이터 개수

### OFFSET

- 데이터를 가져오기 시작할 위치

### 페이징 공식

```jsx
offset = (currentPage - 1) * limit;
```

### 예시

```sql
SELECT *
FROM books
LIMIT 4 OFFSET 4;
```

→ 5번째 데이터부터 4개 조회 (2페이지, 페이지당 4개 기준)