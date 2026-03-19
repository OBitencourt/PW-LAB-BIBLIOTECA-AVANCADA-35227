import { Router } from "express";
import { createBook, deleteBook, editBook, getBook, getBooks, searchBook } from "../controllers/book.controller.js";

const booksRouter = Router()

booksRouter.get("/", getBooks)
booksRouter.get("/search", searchBook)
booksRouter.get("/:id", getBook)
booksRouter.post("/", createBook)
booksRouter.put("/:id", editBook)
booksRouter.delete("/:id", deleteBook)

export default booksRouter