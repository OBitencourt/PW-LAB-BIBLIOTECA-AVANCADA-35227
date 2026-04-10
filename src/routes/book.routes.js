import { Router } from "express";
import { createBook, deleteBook, editBook, getBook, getBooks, searchBook } from "../controllers/book.controller.js";
import { checkToken } from "../middlewares/checkToken.js"

const booksRouter = Router()

booksRouter.get("/", getBooks)
booksRouter.get("/search", searchBook)
booksRouter.get("/:id", getBook)

// Rotas protegidas pelo middleware

booksRouter.post("/", checkToken , createBook)
booksRouter.put("/:id", checkToken , editBook)
booksRouter.delete("/:id", checkToken , deleteBook)

export default booksRouter