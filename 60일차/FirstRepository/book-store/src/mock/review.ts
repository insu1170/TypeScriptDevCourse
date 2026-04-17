import { BASE_URL } from "@/api/http";
import { BookReviewItem } from "@/models/book.model";
import { http, HttpResponse } from "msw";
import { fakerKO as faker } from "@faker-js/faker";
// const mockReviewData: BookReviewItem[] = [
//   {
//     id: 1,
//     userName: "bob",
//     content: "Thanks",
//     createdAt: "2026-01-23",
//     score: 4,
//   },
//   {
//     id: 2,
//     userName: "amy",
//     content: "good",
//     createdAt: "2026-02-22",
//     score: 3,
//   },
// ];

const mockReviewData: BookReviewItem[] = Array.from({ length: 8 }).map(
  (_, index) => ({
    id: index,
    userName: `${faker.person.lastName()}${faker.person.firstName()}`,
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    score: faker.number.int({ min: 1, max: 5 }),
  }),
);

export const reviewsById = http.get(`${BASE_URL}/reviews/:bookId`, () => {
  return HttpResponse.json(mockReviewData, {
    status: 200,
  });
});

export const addReview = http.post(`${BASE_URL}/reviews/:bookId`, () => {
  return HttpResponse.json(
    {
      message: "리뷰가 등록되었습니다.",
    },
    {
      status: 200,
    },
  );
});

export const reviewForMain = http.get(`${BASE_URL}/reviews`, () => {
  return HttpResponse.json(mockReviewData, {
    status: 200,
  });
});
