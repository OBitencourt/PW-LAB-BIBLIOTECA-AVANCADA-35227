import { deleteAuthorService } from "../services/author.service.js"
import { createBookService, deleteBookService, editBookService, getBookService, getBooksService } from "../services/book.service.js"


export const getBooks = async (req, res) => {

    const { status, message, books } = await getBooksService()


    res.status(status).json({ message: message, books: books ? books : "Erro" })
}

export const getBook = async (req, res) => {
    const { id } = req.params
    const { status, message, book } = await getBookService(id)

    if(!book) {
        return res.status(status).json({ message: message })
    }

    res.status(status).json({ message: message, book: book })
}

export const createBook = async (req, res) => {
    const { title, year, genre, authorId } = req.body

    const { status, message, book } = await createBookService(title, year, genre, authorId)

    res.status(status).json({ message: message, book: book ? book : "Erro" })
}

export const editBook = async (req, res) => {
    const { id } = req.params
    const { title, year, genre, available } = req.body

    const { status, message, book } = await editBookService(id, title, year, genre, available)

    res.status(status).json({ message: message, book: book })
}

export const deleteBook = async (req, res) => {
    const { id } = req.params
    const { status, message, book} = await deleteBookService(id)


    res.status(status).json({ message: message, book: book ? book : "Erro" })
}