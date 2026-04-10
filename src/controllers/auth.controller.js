import { signInUserService, signUpUserService } from "../services/auth.service.js"

export const signUpUser = async (req, res) => {
    const { name, email, password } = req.body

    const { status, message, user } = await signUpUserService(
        name,
        email,
        password
    )

    res.status(status).json({
        message,
        user: user ? user : "Erro"
    })
}

export const signInUser = async (req, res) => {
    const { email, password } = req.body

    const { status, message, user, token } = await signInUserService(
        email,
        password
    )

    res.status(status).json({
        message,
        user: user ? user : "Erro",
        token: token ? token : null
    })
}