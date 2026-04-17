import { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/cart.api";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);

  const [cartAdded, setCartAdded] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const showAlert = useAlert();
  const likeToggle = () => {
    console.log(book?.liked);
    if (!isLoggedIn) {
      showAlert("로그인이 필요합니다.");
      return;
    }
    if (!book) return;
    if (book.liked) {
      // 이미 좋아요 된 상태 -> 좋아요 취소
      unlikeBook(String(book.id)).then(() => {
        setBook({
          ...book,
          liked: false,
          likes: book.likes - 1,
        });
      });
    } else {
      // 좋아요 실행
      likeBook(String(book.id)).then(() => {
        // 성공 처리
        setBook({
          ...book,
          // book 데이터에서 갱신 될 정보
          liked: true,
          // 낙관적 업데이트
          likes: book.likes + 1,
        });
      });
    }
  };
  const addToCart = (quantity: number) => {
    if (!book) return;
    addCart({
      book_id: book.id,
      quantity: quantity,
    }).then(() => {
      showAlert("장바구니에 추가되었습니다.");
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };
  useEffect(() => {
    if (!bookId) return;
    fetchBook(bookId).then((book) => {
      setBook(book);
    });
    // bookId가 변경되면 refetch
  }, [bookId]);

  return { book, likeToggle, addToCart, cartAdded };
};
