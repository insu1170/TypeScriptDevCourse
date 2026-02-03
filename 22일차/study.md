# 22일차 날짜 / 시간 타입

### DATE

- **날짜만 저장**
- 형식: `YYYY-MM-DD`
- 예: 생년월일, 이벤트 날짜

---

### DATETIME

- **날짜 + 시간 저장**
- 형식: `YYYY-MM-DD HH:MM:SS`
- 서버 시간대 영향을 받지 않음
- 예: 게시글 작성 시간, 주문 시간

---

### TIME

- **시간만 저장**
- 형식: `HH:MM:SS`
- 예: 근무 시간, 예약 시간

---

### TIMESTAMP

- **날짜 + 시간 저장 + 시간대(TimeZone) 영향 받음**
- `CURRENT_TIMESTAMP`로 자동 입력 가능
- INSERT / UPDATE 시 자동 갱신 설정 가능

---

## NOT NULL + DEFAULT

### NOT NULL

- 반드시 값이 들어가야 함
- `NULL` 삽입 불가

```sql
name VARCHAR(30) NOT NULL

```

---

### DEFAULT

- 값이 입력되지 않으면 **기본값 자동 저장**

```sql
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
```

 INSERT 시 시간을 직접 넣지 않아도 됨.

---

## 외래키 (Foreign Key)

 **다른 테이블의 PK를 참조하여 데이터 무결성 보장**

예:

- users → 회원
- posts → 게시글
- user_id로 작성자 연결

```sql
ALTER TABLE posts
ADD CONSTRAINT fk_posts_user
FOREIGN KEY (user_id)
REFERENCES users(id);

```

---

## JOIN

**여러 테이블을 연결해서 조회하는 기능**

---

### INNER JOIN (기본 JOIN)

- **양쪽 테이블에 모두 존재하는 데이터만 조회**

```sql
SELECT *
FROM posts p
JOIN users u
ON p.user_id = u.id;

```

작성자가 있는 게시글만 조회됨.

---

### LEFT JOIN

- **왼쪽 테이블 기준 모든 데이터 유지**
- 오른쪽에 없으면 `NULL`

```sql
SELECT *
FROM posts p
LEFT JOIN users u
ON p.user_id = u.id;
작성자가 삭제된 게시글도 확인 가능.
```

---

### ✔ RIGHT JOIN

- 오른쪽 테이블 기준 유지
- 실무에서는 거의 사용하지 않음 (LEFT JOIN으로 대체 가능)

---

### ✔ CROSS JOIN

- 두 테이블의 **모든 조합 생성 (Cartesian Product)**