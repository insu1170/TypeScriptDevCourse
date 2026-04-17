import styled from "styled-components";
import Title from "../components/common/Title";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksEmpty from "../components/books/BooksEmpty";
import Pagination from "../components/books/Pagination.tsx";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import { useBooksInfinite } from "../hooks/useBooksIntinite";
import Loading from "@/components/common/Loading";
import Button from "@/components/common/Button";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

function Books() {
  const {
    books,
    pagination,
    isEmpty,
    isBooksLoading,
    fetchNextPage,
    hasNextPage,
  } = useBooksInfinite();

  // const moreRef = useRef(null);

  // useEffect(() => {
  //   // entries 옵저버가 관찰할 대상
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         observer.unobserve(entry.target);
  //       }
  //     });
  //   });
  //   if (moreRef.current) {
  //     observer.observe(moreRef.current);
  //   }
  //   return () => observer.disconnect();
  // }, [books, moreRef]);

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  });

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  // early return
  if (isEmpty) {
    return <BooksEmpty />;
  }
  if (!books || !pagination || isBooksLoading) {
    return <Loading />;
  }
  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        {/* 필터 */}
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        <BooksList books={books} />
        {/* <Pagination pagination={pagination} /> */}

        <div className="more" ref={moreRef}>
          <Button
            size="medium"
            schema="normal"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
          >
            {hasNextPage ? "더보기" : "마지막 페이지"}
          </Button>
        </div>
      </BooksStyle>
    </>
  );
}

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;

export default Books;
