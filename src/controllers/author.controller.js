import { createAuthorService, deleteAuthorService, editAuthorService, getAuthorBooksService, getAuthorService, getAuthorsService } from "../services/author.service.js"

// Controller ativa o service, trata o retorno e devolve para quem requisitou
export const getAuthors = async (req, res) => {

    const { status, message, authors } = await getAuthorsService()


    res.status(status).json({ message: message, authors: authors ? authors : "Erro" })
}

export const getAuthor = async (req, res) => {
    const { id } = req.params
    const author = await getAuthorService(id)

    if(!author) {
        return res.status(400).json({ message: "Não há autor cadastrados com esse id."})
    }

    res.status(200).json({ message: "Sucesso ao buscar autores.", author: author })
}

export const createAuthor = async (req, res) => {
    const { name, nationality, birthYear } = req.body

    const { status, message, author } = await createAuthorService(name, nationality, birthYear)

    res.status(status).json({ message: message, author: author ? author : "Erro" })
}

export const editAuthor = async (req, res) => {
    const { id } = req.params
    const { name, nationality, birthYear } = req.body

    const { status, message, author } = await editAuthorService(id, name, nationality, birthYear)

    res.status(status).json({ message: message, author: author })
}

export const deleteAuthor = async (req, res) => {
    const { id } = req.params
    const { status, message, author} = await deleteAuthorService(id)


    res.status(status).json({ message: message, author: author ? author : "Erro" })
}

export const getAuthorBooks = async (req, res) => {
    const { id } = req.params
    const { status, message, books} = await getAuthorBooksService(id)

    res.status(status).json({ message: message, books: books ? books : "Erro" })
}