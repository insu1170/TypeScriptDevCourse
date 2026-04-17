import { Request, Response, Router } from "express";
import { type BooksParams, type BooksResponse } from "./model.js"

const router = Router();

router.get("/category", (req: Request, res: Response) => {
    return res.json([
        {id: 0, name: "동화"},
        {id: 1, name: "소설"},
        {id: 2, name: "사회"}
    ]);
})

router.post("/users/join", (req: Request, res: Response) => {
    return res.status(201).end();
})

router.post("/users/reset", (req: Request, res: Response) => {
    return res.status(200).end();
})

router.put("/users/reset", (req: Request, res: Response) => {
    return res.status(200).end();
})

router.post("/users/login", (req: Request, res: Response) => {
    let n: number = parseInt(req.body.password);
    if (Number.isNaN(n)) {
        return res.json({
            token: 'token!'
        });
    } else {
        return res.status(n).end();
    }
    
})
/*
    category_id?: number;
    news: boolean;
    currentPage?: number;
    limit: number;
*/
router.get("/books", (req: Request, res: Response) => {
    const body: BooksParams = req.body;
    let response: BooksResponse = {
        books: [{
            id: 1,
            title: "you don't know js",
            img: 5,
            category_id: body.category_id ?? 1,
            summary: "summary",
            author: "author",
            price: 10000,
            likes: 1,
            form: "paper",
            isbn: "ISBN",
            detail: "detail",
            pages: 100,
            contents: "contents",
            pubDate: "2025-01-23",
        }, {
            id: 2,
            title: "you don't know ts",
            img: 6,
            category_id: body.category_id ?? 1,
            summary: "summary",
            author: "author",
            price: 10000,
            likes: 1,
            form: "paper",
            isbn: "ISBN",
            detail: "detail",
            pages: 100,
            contents: "contents",
            pubDate: "2025-01-23",
        }],
        pagination: {
            currentPage: body.currentPage ?? 1,
            totalCount: 2
        }
    }
    if (body.currentPage > 1) {
        response.books = [];
    }
    return res.json(response);
})

export default router;