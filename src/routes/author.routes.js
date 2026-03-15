import { Router } from "express";
import { createAuthor, deleteAuthor, editAuthor, getAuthor, getAuthorBooks, getAuthors } from "../controllers/author.controller.js";

const authorsRoute = Router()

authorsRoute.get("/", getAuthors)
authorsRoute.get("/:id", getAuthor)
authorsRoute.post("/", createAuthor)
authorsRoute.put("/:id", editAuthor)
authorsRoute.delete("/:id", deleteAuthor)
authorsRoute.get("/:id/books", getAuthorBooks)

export default authorsRoute