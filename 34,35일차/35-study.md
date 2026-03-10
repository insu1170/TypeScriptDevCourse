# 35일차

## 1. INSERT는 반드시 순서대로 실행되어야 한다

주문 로직에서는 다음과 같은 순서를 반드시 지켜야 한다.

1. delivery INSERT
2. orders INSERT
3. orderedBook INSERT

이유:

- delivery의 insertId가 orders의 delivery_id로 들어가야 한다.
- orders의 insertId가 orderedBook의 order_id로 들어가야 한다.
- 이전 쿼리가 끝나기 전에 다음 쿼리를 실행하면 undefined 또는 NULL이 들어가 에러가 발생한다.

핵심 정리

- INSERT는 비동기이므로 반드시 순서 보장 필요
- insertId는 이전 쿼리 완료 후에만 사용 가능
- Bulk Insert는 반드시 2차원 배열
- values ? 사용 시 conn.query(sql, [values]) 형태로 전달

[실습](https://www.notion.so/313c99a5877680d8a1b6ced1160f1eb0?pvs=21)