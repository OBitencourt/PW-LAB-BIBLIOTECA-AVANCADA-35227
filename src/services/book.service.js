import prisma from "../prisma/prismaClient.js"


export const getBooksService = async (page, limit, sort) => {

    let data = {}
    let orderBy = {}
    const pageNumber = page || 1
    const limitNumber = limit || 10
    const skip = (pageNumber - 1) * limitNumber

    
    if (sort === "year") {
        orderBy = { year: "asc" }
    }

    if (sort === "title") {
        orderBy = { title: "asc" }
    }

    if(page && !limit) {
        return data = {
            status: 404,
            message: "Forneça também o limite."
        }
    }

    if(!page && limit) {
        return data = {
            status: 404,
            message: "Forneça também a página."
        }
    }
    
    const books = await prisma.book.findMany({
        skip: skip,
        take: limitNumber,
        orderBy: orderBy
    })


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

    if (!book) {
        return data = {
            status: 404,
            message: "O livro não existe no banco de dados."
        }
    }

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
            message: `O livro com o id '${id}' não existe no banco de dados.`
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

    if(!book) {
        return data = {
            status: 204,
            message: "Não foi encontrado o respectivo livro."
        }
    }

    return data = {
        status: 200,
        message: "Sucesso ao deletar livro",
        book: book
    }
}

export const searchBooksService = async (title) => {
    let data = {}

    if(!title) {
        return data = {
            status: 404,
            message: "Forneça um título de um livro para realizar a pesquisa"
        }
    }

    const books = await prisma.book.findMany({
        where: {
            title: {
                contains: title,
                mode: "insensitive"
            }
        }
    })

    return data = {
        status: 200,
        message: "Sucesso ao buscar livros",
        books: books
    }
}