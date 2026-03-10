
# MySQL 데이터 삭제 정리

## 1. DELETE

- 문법: `DELETE FROM 테이블명 WHERE 조건;`
- WHERE 조건이 없으면 모든 행이 삭제됨
- 특정 조건에 맞는 데이터만 삭제할 때 사용

## 2. DROP

- 문법: `DROP TABLE 테이블명;`
- 테이블 자체를 완전히 삭제 (구조 + 데이터 모두 삭제)

## 3. TRUNCATE

- 문법: `TRUNCATE TABLE 테이블명;`
- 테이블 구조는 유지하고 모든 행 삭제
- AUTO_INCREMENT 값도 초기화됨 (1부터 다시 시작)

---

## MySQL Safe Update Mode
- DELETE 또는 UPDATE 실행 시 WHERE 절이 없으면 오류 발생
- 전체 데이터 삭제 시에는 TRUNCATE 사용 권장

---

## 외래키(FK) 제약 해제

```sql
SET foreign_key_checks = 0;
```

- 외래키 제약 조건 검사 비활성화
- 작업 후 다시 활성화 필요:

```sql
SET foreign_key_checks = 1;
```