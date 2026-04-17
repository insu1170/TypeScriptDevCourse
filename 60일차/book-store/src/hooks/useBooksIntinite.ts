import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Book } from "../models/book.model";
import { Pagination } from "../models/pagnation.model";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

// 변경된 쿼리스트링 감지해서 패치! -> 화면 상태 갱신해서 전달
export const useBooksInfinite = () => {
  const location = useLocation();

  // 업데이트에 따라 페이지 params를 변경
  const getBooks = ({ pageParam }: { pageParam: number }) => {
    const params = new URLSearchParams(location.search);
    const category_id = params.get(QUERYSTRING.CATEGORY_ID)
      ? Number(params.get(QUERYSTRING.CATEGORY_ID))
      : undefined;
    const news = params.get(QUERYSTRING.NEWS) ? true : undefined;
    const limit = LIMIT;
    const currentPage = pageParam;

    return fetchBooks({ category_id, news, limit, currentPage });
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["books", location.search],
    queryFn: ({ pageParam = 1 }) => getBooks({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const isLastPage =
        Math.ceil(lastPage.pagination.totalCount / LIMIT) ===
        lastPage.pagination.currentPage;

      return isLastPage ? null : lastPage.pagination.currentPage + 1;
    },
  });

  const books = data ? data.pages.flatMap((page) => page.books) : [];
  const pagination = data ? data.pages[data.pages.length - 1].pagination : {};
  const isEmpty = books.length === 0;

  return {
    books,
    pagination,
    isEmpty,
    isBooksLoading: isFetching,
    fetchNextPage,
    hasNextPage,
  };
};
