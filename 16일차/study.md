# 16일차

## 메서드 규칙

- 생성: **POST**
    - 회원가입 (id, password 등)
- 조회: **GET**
    - URL로 보내기 (path / query)
- 수정: **PUT** (또는 부분 수정은 PATCH)
- 삭제: **DELETE**

---

## Map 예제 (undefined가 나오는 이유)

```jsx
let a = new Map();
let num = 1;

a.set(num++, data);

a.get(num); // undefined

```

### 왜 undefined인가?

- `num++`는 **현재 값으로 set 후 증가**
- 즉, 실제 저장된 key는 `1`
- `num`은 증가되어 `2`
- `get(2)` → 존재하지 않는 key → `undefined`

---

## 주의 사항

- 다른 툴(메신저, 노션, 문서툴 등)에서 복붙할 때
    - 글꼴 때문에 `Map / map`, `++`, 특수문자가
        
        **다른 문자로 인식될 수 있음**
        
- 코드 붙여넣기 후 반드시:
    - 대소문자
    - 특수문자
    - 예약어
        
        확인하기
        
