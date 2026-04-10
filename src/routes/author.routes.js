import { Router } from "express";
import { createAuthor, deleteAuthor, editAuthor, getAuthor, getAuthorBooks, getAuthors } from "../controllers/author.controller.js";
import { checkToken } from "../middlewares/checkToken.js"

const authorsRouter = Router()

authorsRouter.get("/", getAuthors)
authorsRouter.get("/:id", getAuthor)
authorsRouter.get("/:id/books", getAuthorBooks)
authorsRouter.post("/", checkToken , createAuthor)
authorsRouter.put("/:id", checkToken , editAuthor)
authorsRouter.delete("/:id", checkToken , deleteAuthor)

export default authorsRouter