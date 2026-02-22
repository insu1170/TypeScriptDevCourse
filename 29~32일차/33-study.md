# 33일차 서브쿼리 & EXISTS 

## 1. 서브쿼리 (Subquery)

### 개념

- 쿼리 안에 또 다른 쿼리를 작성하는 것
- SELECT, WHERE, FROM 등 다양한 위치에 들어갈 수 있음

---

## 예 - 좋아요 개수 포함 조회

```sql
SELECT
    books.*,
    (SELECT COUNT(*)
     FROM likes
     WHERE books.id = liked_book_id) AS likes
FROM books;
```

### 설명

- 각 책마다
- likes 테이블에서 해당 책을 좋아요한 개수를 COUNT
- 결과 컬럼 이름은 likes

---

## 2. EXISTS

### 개념

- 특정 조건을 만족하는 행이 "존재하는지" 확인
- 결과는 1(true) 또는 0(false)
- 성능상 COUNT(*)보다 유리한 경우가 많음

---

## 예 - 좋아요 개수 + 내가 눌렀는지 여부

```sql
SELECT
    books.*,
    (SELECT COUNT(*)
     FROM likes
     WHERE liked_book_id = books.id) AS likes,

    (SELECT EXISTS (
        SELECT 1
        FROM likes
        WHERE user_id = 1
        AND liked_book_id = books.id
    )) AS liked

FROM books
LEFT JOIN category
    ON books.category_id = category.id

WHERE books.id = 1;
```

---

## 결과 컬럼 설명

| 컬럼 | 의미 |
| --- | --- |
| books.* | 책 기본 정보 |
| likes | 해당 책의 좋아요 개수 |
| liked | 해당 유저가 좋아요 눌렀는지 (0 또는 1) |

---

## 정리

### 서브쿼리

- 개별 행마다 추가 계산을 할 때 사용
- 가독성 좋음
- 하지만 데이터가 많으면 성능 저하 가능

### EXISTS

- "존재 여부"만 확인할 때 사용
- COUNT(*)보다 효율적

---