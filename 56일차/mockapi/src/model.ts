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

export interface Pagination {
    currentPage: number;
    totalCount: number;
}

export interface BooksParams {
    category_id?: number;
    news: boolean;
    currentPage?: number;
    limit: number;
}

export interface BooksResponse {
    books: Book[];
    pagination: Pagination;
}