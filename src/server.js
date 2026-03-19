import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import morgan from 'morgan'
import authorsRoute from './routes/author.routes.js'
import booksRouter from './routes/book.routes.js'


const app = express()

configDotenv()
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.use("/authors", authorsRoute)
app.use("/books", booksRouter)

const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`)
})