import jwt from 'jsonwebtoken'

export const checkToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided." })
        }

        const token = authHeader.split(' ')[1]
        
        if (!token) {
            return res.status(401).json({ message: 'Token error' })
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' })
        
        req.userId = decoded.userId
        next()
    })
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}