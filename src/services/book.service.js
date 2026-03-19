import prisma from "../prisma/prismaClient.js"


export const getBooksService = async () => {

    let data = {}

    const books = await prisma.book.findMany()

    if(!books) {
        return data = {
            status: 404,
            message: "Não há livros cadastrados"
        }
    }

    return data = {
        status: 200,
        message: "Sucesso ao buscar livros.",
        books: books
    }
}

export const getBookService = async (id) => {
    let data = {}

    if(!id) {
        return data = {
            status: 404,
            message: "Forneça um id."
        }
    }

    const book = await prisma.book.findUnique({ where: { id: id } })

    return data = {
        status: 200,
        message: "Sucesso ao buscar livro.",
        book: book
    }
}

export const createBookService = async (title, year, genre, authorId) => {

    let data = {}

    if(!title) {
        return data = {
            status: 404,
            message: "Forneça um nome."
        }
    }

    if(!year) {
        return data = {
            status: 404,
            message: "Forneça um ano de lançamento."
        }
    }

    if(!genre) {
        return data = {
            status: 404,
            message: "Forneça a categoria do livro (gênero)."
        }
    }

    if(!authorId) {
        return data = {
            status: 404,
            message: "Forneça id do autor."
        }
    }

    const book = await prisma.book.create({
        data: {
            title,
            year,
            genre,
            authorId,
        }
    })

    return data = {
        status: 200,
        message: "Sucesso ao criar autor.",
        book: book
    }
}

export const editBookService = async (id, title, year, genre, available) => {
    
    const bookExists = await prisma.book.findUnique({ where: { id }})
    let data = {}

    if (!bookExists) {
        return data = {
            status: 404,
            message: `O livro com o id '${id}' não foi encontrado`
        }
    }

    if (!title && !year && !genre && !available) {
        return data = {
            status: 404,
            message: `Nenhuma informação foi passada para que fosse realizada a edição.`
        }
    }

    const book = await prisma.book.update({
        where: {
            id
        },
        data: {
            title,
            year,
            genre,
            available
        }
    })

    return data = {
        status: 200,
        message: "Livro editado com sucesso.",
        book: book
    }
}

export const deleteBookService = async (id) => {
    const bookExists = await prisma.book.findUnique({ where: { id }})
    let data = {}

    if(!bookExists) {
        return data = {
            status: 404,
            message: "Livro não encontrado."
        }
    }

    const book = await prisma.book.delete({ where: { id } })

    return data = {
        status: 200,
        message: "Sucesso ao deletar livro",
        book: book
    }
}