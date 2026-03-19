import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import morgan from 'morgan'
import authorsRoute from './routes/author.routes.js'
import booksRouter from './routes/book.routes.js'
import prisma from './prisma/prismaClient.js'

const app = express()

configDotenv()
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.use("/authors", authorsRoute)
app.use("/books", booksRouter)

app.use("/stats", async (req, res) => {

    const totalBooks = await prisma.book.count();
    const totalAuthors = await prisma.author.count();
    const availableBooks = await prisma.book.count({
        where: { available: true }
    });
    const borrowedBooks = await prisma.book.count({
        where: { available: false }
    });

    let data = {
        totalBooks,
        totalAuthors,
        availableBooks,
        borrowedBooks
    }

    return res.status(200).json({ message: "Status do banco de dados pegos com sucesso: ", data})
})

const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`)
})