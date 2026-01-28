# 데이터베이스 기초 개념

## 데이터베이스(Database)

- 데이터를 **통합적이고 효율적으로 관리**하기 위한 데이터 집합체
- 데이터를 구조화하여 관리함으로써
    - 데이터 중복 최소화
    - 효율적인 데이터 검색 및 연산 가능

---

## DBMS (Database Management System)

- 데이터베이스를 생성·운영·관리하기 위한 시스템
- 애플리케이션과 데이터베이스 사이에서 소통 역할 수행

### 대표적인 DBMS

- Oracle
- MySQL
- MariaDB

---

## SQL (Structured Query Language)

- 데이터베이스에 **연산을 요청하기 위한 언어**
- 데이터 **CRUD(Create, Read, Update, Delete)** 작업 수행

### 데이터베이스 관련 명령어

- 데이터베이스 목록 확인
    - `SHOW DATABASES;`
- 데이터베이스 생성
    - `CREATE DATABASE db명;`
- 데이터베이스 선택
    - `USE db명;`

---

### 테이블 관련 명령어

- 테이블 생성
    - `CREATE TABLE table명 (컬럼명 자료형);`
- 데이터 조회
    - `SELECT * FROM table명;`
- 데이터 삽입
    - `INSERT INTO 테이블명 (컬럼명) VALUES (데이터);`
- 조건절
    - `WHERE 조건;`
- 데이터 수정
    - `UPDATE 테이블명 SET 컬럼명 = 수정값 WHERE 조건;`
- 데이터 삭제
    - `DELETE FROM 테이블명 WHERE 조건;`

---

## Docker

- 애플리케이션 실행을 위한 **가상화된 환경(컨테이너)** 을 제공하는 플랫폼
- 동일한 실행 환경을 빠르게 구성 가능

### Docker 명령어 예시

- MariaDB 이미지 다운로드
    - `docker pull mariadb`
- MariaDB 컨테이너 생성 및 실행
    - `docker run --name mariadb -d -p 3306:3306 --restart=always -e MYSQL_ROOT_PASSWORD=root mariadb`
- 실행 중인 컨테이너 접속
    - `docker exec -it mariadb /bin/bash`
- MariaDB 접속
    - `mariadb -u root -p`

---

## Node.js에서 DB 연결 예시

```jsx
const mariadb = require('mysql');

const conn = mariadb.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'Tennis'
});

```