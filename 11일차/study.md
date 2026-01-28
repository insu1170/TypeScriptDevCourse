# 11일차 웹 서버 · API · REST · URL 기초 개념

## 웹 서버(Web Server)

- 클라이언트 요청에 대해 **정적 페이지를 처리**
- 동적 페이지 요청은 직접 처리하지 않고 **웹 애플리케이션 서버(WAS)** 에 전달

---

## API (Application Programming Interface)

- 애플리케이션 또는 라이브러리에 접근하기 위해 정의된 **규칙과 약속의 집합**
- 서로 다른 시스템 간의 소통 창구 역할

---

## Interface

- 서로 다른 두 대상 사이에서 **중재·매개 역할**을 수행

### Interface 예시

- **GUI (Graphical User Interface)**
    - 그래픽을 통해 컴퓨터에 명령 전달
- **CLI (Command Line Interface)**
    - 명령어 입력을 통해 컴퓨터에 명령 전달

---

## REST API

- HTTP를 기반으로 한 API 설계 규칙

### REST API 규칙

- 소문자 사용
- 하이픈(-) 사용
- URL 마지막에 `/` 사용하지 않음
- 행위(동사) 또는 목적 포함하지 않음
- 파일 확장자 포함하지 않음
- 리소스는 **복수형 사용**

---

### REST API 예시

- 전체 상품 조회
    - `GET /products`
- 개별 상품 조회
    - `GET /products/{id}`

---

### 복수형을 사용하는 이유

- 여러 상품 중에서 특정 `id`를 가진 개별 데이터를 의미
- API 설계의 **일관성과 통일감 유지**

---

## URL (Uniform Resource Locator)

- 인터넷 상에서 자원의 위치를 나타내는 주소
- 단순한 페이지 위치 표시뿐 아니라
    
    **서버에 데이터 처리 요청을 전달하는 수단**