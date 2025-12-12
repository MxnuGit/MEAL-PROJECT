import { Request, Response } from "express";
import { User } from "../utils/auth"
import { connection } from "../utils/db"

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body

    await connection.execute("INSERT INTO users (username, password) VALUES (?, ?)", [
        username,
        password,
    ])

    const [results] = await connection.execute(
        "SELECT username, role FROM users WHERE username=?",
        [username]
    )
    const newUser = (results as User[])[0]

    res.json({ message: "Registrazione effetuata con successo" })
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body

    const [results] = await connection.execute(
        "SELECT username, role, password FROM users WHERE username=?",
        [username]
    )

    res.json({ message: "Login effettuato con successo" })
}

export const logout = async (req: Request, res: Response) => {
    res.json({ message: "Logout effettuato con successo" })
}

export const getProfile = async (req: Request, res: Response) => {
    res.json({})
}
