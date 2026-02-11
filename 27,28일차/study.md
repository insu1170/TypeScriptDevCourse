## 회원 API

1. 회원가입

| Method | POST |
| --- | --- |
| URI | /join |
| HTTP status code | 성공 200 |
| Request Body | {
email: “ 사용자가 입력한 이메일”
Password: “사용자가 입력한 비밀번호”
} |
| Response Body |  |
1. 로그인

| Method | POST |
| --- | --- |
| URI | /login |
| HTTP status code | 성공 200 |
| Request Body | {
email: “ 사용자가 입력한 이메일”
Password: “사용자가 입력한 비밀번호”
} |
| Response Body | JWT Token |

1. 비밀번호 초기화 요청

| Method | POST |
| --- | --- |
| URI | /reset |
| HTTP status code | 성공 200 |
| Request Body | {
email: “사용자가 입력한 이메일”
} |
| Response Body |  |

1. 비밀번호 초기화

| Method | PUT |
| --- | --- |
| URI | /reset |
| HTTP status code | 성공 200 |
| Request Body | {
Password: “사용자가 입력한 비밀번호”
} |
| Response Body |  |

## 상품 API

1. 전체 도서 조회

| Method | GET |
| --- | --- |
| URI | /books |
| HTTP status code | 성공 200 |
| Request Body |  |
| Response Body | [
 {id: “도서 id”,
title: “도서 제목”,
summary: “ 요약 정보”,
author: “ 도서 작가”
price: “가격”,
likes: “ 좋아요 수”,
pubData: "출간일"
},{id: “도서 id”
title: “도서 제목”,
summary: “ 요약 정보”,
author: “ 도서 작가”
price: “가격”,
likes: “ 좋아요 수”,
pubData: "출간일"
},…
] |
|  |  |
1. 개별 도서 조회

| Method | GET |
| --- | --- |
| URI | /books/{bookId} |
| HTTP status code | 성공 200 |
| Request Body |  |
| Response Body | {
id: 도서 id,
title: “도서제목”
category: "카테고리",
format: 포멧,
isbn: "isbn",
summary: "요약 설명",
description: "상세 설명",
author: "도서 작가",
pages: "쪽 수",
index: "목차",
price: "가격",
likes: 좋아요 수
liked: boolean
} |
1. 카테고리별 도서 목록 조회

| Method | GET |
| --- | --- |
| URI | /books?categoryId={categoryId}&new={boolean} |
| HTTP status code | 성공 200 |
| Request Body |  |
| Response Body | {
id: “도서 id”,
title: “도서 제목”,
summary: “ 요약 정보”,
author: “ 도서 작가”
price: “가격”,
likes: “ 좋아요 수”,
pubData: "출간일"
} |

## 좋아요 API - ERD 완성 후 추후 작성

1. 좋아요 추가

| Method | POST |
| --- | --- |
| URI | /likes/{bookId} |
| HTTP status code | 성공 200 |
| Request Body |  |
| Response Body | {

} |
1. 좋아요 취소

| Method | DELETE |
| --- | --- |
| URI | /likes/{bookId} |
| HTTP status code | 성공 200 |
| Request Body |  |
| Response Body | {

} |
|  |  |

## 장바구니 API

1. 장바구니 담기

| Method | POST |
| --- | --- |
| URI | /cart |
| HTTP status code | 성공 200 |
| Request Body | {
bookId: 도서 id,
count: 수량
} |
| Response Body |  |
1. 장바구니 조회

| Method | GET |
| --- | --- |
| URI | /cart |
| HTTP status code | 성공 200 |
| Request Body |  |
| Response Body | [
{
cartItemId: 장바구니 도서 id, 
bookId: 도서 Id,
title: 도서제목,
summary: 도서요약,
count: 수량,
price: 가격,
},{
cartItemId: 장바구니 도서 id, 
bookId: 도서Id,
title: 도서제목,
summary: 도서요약,
count: 수량,
price: 가격,
},
...
] |
1. 장바구니 삭제

| Method | DELETE |
| --- | --- |
| URI | /cart/{bookId} |
| HTTP status code | 성공 200 |
| Request Body |  |
| Response Body |  |

1. (장바구니에 선택한) 주문 예상 상품 조회

| Method | GET |
| --- | --- |
| URI | /.. |
| HTTP status code | 성공 200 |
| Request Body | [cartItemId, cartItemId…] |
| Response Body | [
{
cartItemId: 장바구니 도서 id, 
bookId: 도서 Id,
title: 도서제목,
summary: 도서요약,
count: 수량,
price: 가격,
},{
cartItemId: 장바구니 도서 id, 
bookId: 도서Id,
title: 도서제목,
summary: 도서요약,
count: 수량,
price: 가격,
},
...
] |

## 주문 API

1. 결제하기 = 주문하기 = 주문등록 = db 주문 insert

| Method | POST |
| --- | --- |
| URI | /order |
| HTTP status code | 성공 200 |
| Request Body | {
item: [{
cartItemId: 장바구니 도서 id
bookId: 도서 id
count: 수량
},{
cartItemId: 장바구니 도서 id
bookId: 도서 id
count: 수량
}],
delivery : {
address:”주소”,
receiver: 이름,
contact: 010-0000-0000
}
totalPrice: 총 금액 |
| Response Body |  |

1. 주문 내역 조회

| Method | GET |
| --- | --- |
| URI | /orders |
| HTTP status code | 성공 200 |
| Request Body | [{
order_id: 주문 id
created_at: 주문일자
delivery:{
address: 주소
receiver: 이름
contact: 전화번호
},
bookTitle: 대표 책 제목,
totalPrice: 결제 금액,
totalCount: 총 수량
}] |
| Response Body |  |

1. 주문 상세 상품 조회

| Method | GET |
| --- | --- |
| URI | /orders/{orderId} |
| HTTP status code | 성공 200 |
| Request Body | [{
bookId: 도서 id,
bookTitle: 도서제목
author: 작가명
price: 가격
count: 수량
},{
bookId: 도서 id,
bookTitle: 도서제목
author: 작가명
price: 가격
count: 수량
}] |
| Response Body |  |

## 28일차 요약

DB 설계에서 **데이터 중복은 적게**

중복 데이터가 많아지면 다음과 같은 문제가 발생합니다:

- 수정할 때 여러 곳을 동시에 바꿔야 함 (Update Anomaly)
- 삭제 시 중요한 정보가 같이 사라질 수 있음 (Delete Anomaly)
- 삽입 시 불필요한 NULL이 생길 수 있음 (Insert Anomaly)

이러한 문제를 방지하기 위해 사용하는 것이 **정규화**