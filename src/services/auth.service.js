import prisma from "../prisma/prismaClient.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signUpUserService = async (name, email, password) => {
    let data = {}

    if (!name || !email || !password) {
        return data = {
            status: 404,
            message: "Preencha todos os campos."
        }
    }

    const userExists = await prisma.user.findUnique({
        where: { email }
    })

    if (userExists) {
        return data = {
            status: 409,
            message: "Email já cadastrado."
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    const userWithoutPassword = { ...user }
    delete userWithoutPassword.password

    return data = {
        status: 200,
        message: "Usuário criado com sucesso.",
        user: userWithoutPassword
    }
}

export const signInUserService = async (email, password) => {
    let data = {}

    if (!email || !password) {
        return data = {
            status: 404,
            message: "Preencha todos os campos."
        }
    }

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        return data = {
            status: 404,
            message: "Usuário não encontrado."
        }
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        return data = {
            status: 401,
            message: "Senha inválida."
        }
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
    )

    const userWithoutPassword = { ...user }
    delete userWithoutPassword.password

    return data = {
        status: 200,
        message: "Login realizado com sucesso.",
        user: userWithoutPassword,
        token
    }
}