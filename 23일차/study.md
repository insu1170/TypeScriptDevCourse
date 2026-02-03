## DB 컬럼 설정

- **PK (Primary Key)**: 각 행을 고유하게 식별하는 키
- **NN (Not Null)**: NULL 값 허용하지 않음
- **UQ (Unique)**: 중복 값 허용하지 않음
- **B (Binary)**: 데이터를 바이너리 형식으로 저장
- **UN (Unsigned)**: 음수 값 사용하지 않음
- **ZF (Zero Fill)**: 숫자 앞자리를 0으로 채움
- **AI (Auto Increment)**: 값이 자동으로 증가됨 → 직접 입력하지 않아도 되어 관리가 쉬움
- **G (Generated)**: 특정 컬럼 값을 기반으로 자동 생성되는 컬럼

---

## DB 시간 설정

DB는 기본적으로 다른 지역 시간대를 사용할 수 있으므로 **Asia/Seoul**로 설정하는 것이 좋다.

- **글로벌 설정**

```sql
set global time_zone = 'Asia/Seoul';

```

- **세션(로컬) 설정**

```sql
set time_zone = 'Asia/Seoul';

```

---

## MySQL 시간 데이터 문자열로 받기

```jsx
const connection = mysql.createConnection({
    host: 'localhost', // 오류 발생 시 '127.0.0.1'로 변경
    user: 'root',
    password: 'root',
    database: 'Youtube',
    dateStrings: true
});

```

- **dateStrings: true** 옵션을 사용하면 시간 데이터를 문자열로 받을 수 있다.

예시:

```
2026-02-03T15:53:11.000Z  →  '2026-02-03 15:59:42'

```

→ 시간 포맷을 다루기 쉬워진다.