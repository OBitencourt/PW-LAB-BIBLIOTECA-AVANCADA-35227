import prisma from "../prisma/prismaClient.js"


// Logicas de prisma e retorno do que foi feito para os controllers

export const getAuthorsService = async () => {

    let data = {}

    const authors = await prisma.author.findMany({
        include: {
            books: true
        }
    })

    if(!authors) {
        return data = {
            status: 404,
            message: "Não há autores cadastrados"
        }
    }

    return data = {
        status: 200,
        message: "Sucesso ao buscar autores.",
        authors: authors
    }
}

export const getAuthorService = async (id) => {
    let data = {}

    if(!id) {
        return data = {
            status: 404,
            message: "Forneça um id."
        }
    }

    const author = await prisma.author.findUnique({ where: { id: id } })

    if(!author) {
        return data = {
            status: 404,
            message: "Autor não existe no banco de dados."
        }
    }

    return data = {
        status: 200,
        message: "Sucesso ao buscar autor.",
        author: author
    }
}

export const createAuthorService = async (name, nationality, birthYear) => {

    let data = {}

    if(!name) {
        return data = {
            status: 404,
            message: "Forneça um nome."
        }
    }

    const author = await prisma.author.create({
        data: {
            name,
            nationality,
            birthYear
        }
    })

    return data = {
        status: 200,
        message: "Sucesso ao criar autor.",
        author: author
    }
}

export const editAuthorService = async (id, name, nationality, birthYear) => {
    
    const authorExists = await prisma.author.findUnique({ where: { id }})
    let data = {}

    if (!authorExists) {
        return data = {
            status: 404,
            message: `O autor com o id '${id}' não existe.`
        }
    }

    if (!name && !nationality && !birthYear) {
        return data = {
            status: 404,
            message: `Nenhuma informação foi passada para que fosse realizada a edição.`
        }
    }

    const author = await prisma.author.update({
        where: {
            id
        },
        data: {
            name,
            nationality,
            birthYear
        }
    })

    return data = {
        status: 200,
        message: "Autor editado com sucesso.",
        author: author
    }
}

export const deleteAuthorService = async (id) => {
    const authorExists = await prisma.author.findUnique({ where: { id }})
    let data = {}

    if(!authorExists) {
        return data = {
            status: 404,
            message: "Autor não encontrado."
        }
    }

    const books = await prisma.book.deleteMany({ where: { authorId: id }})
    const author = await prisma.author.delete({ where: { id } })

    return data = {
        status: 200,
        message: "Sucesso ao deletar autor",
        author: author
    }
}

export const getAuthorBooksService = async (id) => {
    const author = await prisma.author.findMany({ where: { id } })

    if(!author) {
        return data = {
            status: 404,
            message: "O Author fornecido não existe no banco de dados."
        }
    }

    const books = await prisma.book.findMany({ where: { authorId: id } })
    let data = {}

    if(!books) {
        return data = {
            status: 404,
            message: "Livros do autor não foram encontrados."
        }
    }

    return data = {
        status: 200,
        message: "Livros do autor encontrados com sucesso.",
        books: books
    }
}