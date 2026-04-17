import { Book, BookDetail } from "../models/book.model";
import { Pagination } from "../models/pagnation.model";
import { httpClient } from "./http";

interface FetchBooksParams {
  category_id?: number;
  news?: boolean;
  currentPage?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    // params에 해당 항목이 있으면 자동으로 쿼리스트링에 연결
    const response = await httpClient.get<FetchBooksResponse>("/books", {
      params: params,
    });
    return response.data;
  } catch (error) {
    // 응답 실패시!
    return {
      books: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
      },
    };
  }
};

export const fetchBook = async (bookId: string) => {
  const response = await httpClient.get<BookDetail>(`/books/${bookId}`);
  return response.data;
};

export const likeBook = async (bookId: string) => {
  console.log("like", bookId);
  const response = await httpClient.post(`/likes/${bookId}`);
  return response.data;
};

export const unlikeBook = async (bookId: string) => {
  // console.log("like", bookId);
  const response = await httpClient.delete(`/likes/${bookId}`);
  return response.data;
};
