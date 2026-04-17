export interface Book {
  id: number;
  title: string;
  img: number;
  category_id: number;
  form: string;
  isbn: string;
  summary: string;
  detail: string;
  author: string;
  pages: number;
  contents: string;
  price: number;
  likes: number;
  pubDate: string;
}

// Book 에서 확장! Book의 요소 포함
export interface BookDetail extends Book {
  category_name: string;
  liked: boolean;
}
