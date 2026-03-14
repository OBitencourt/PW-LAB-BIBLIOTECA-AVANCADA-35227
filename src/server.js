import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import morgan from 'morgan'
const app = express()

configDotenv()
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))


const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`)
})