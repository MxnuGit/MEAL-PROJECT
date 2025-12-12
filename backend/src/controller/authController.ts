import { Request, Response } from "express";
import { getUser, setUser, unsetUser, User } from "../utils/auth"
import { connection } from "../utils/db"
import bcrypt from "bcrypt"

export const register = async (req: Request, res: Response) => {
    const user = getUser(req, res)
    if(user) {
        res.status(401).send("Questa operazione richiede il logout")
        return
    }
    
    const { username, password } = req.body

    const [users] = await connection.execute("SELECT username FROM users WHERE username=?", [username])

    if(Array.isArray(users) && users.length > 0) {
        res.status(400).send("Username già in uso")
        return 
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await connection.execute("INSERT INTO users (username, password) VALUES (?, ?)", [
        username,
        passwordHash,
    ])

    const [results] = await connection.execute(
        "SELECT username, role FROM users WHERE username=?",
        [username]
    )
    const newUser = (results as User[])[0]

    setUser(req, res, newUser)

    res.json({ message: "Registrazione effetuata con successo" })
}

export const login = async (req: Request, res: Response) => {
    const user = getUser(req, res)
    if(user) {
        res.status(401).send("Questa operazione richiede il logout")
        return
    }

    const { username, password } = req.body

    const [results] = await connection.execute(
        "SELECT username, role, password FROM users WHERE username=?",
        [username]
    )

    if(!Array.isArray(results) || results.length == 0){
        res.status(400).send("Credenziali errate")
        return
    }

    const userData = results[0] as any

    const correctPassword = await bcrypt.compare(password, userData.password)

    if(!correctPassword) {
        res.status(400).send("Credenziali errate")
        return
    }

    delete userData.password

    setUser(req, res, userData)

    res.json({ message: "Login effettuato con successo" })
}

export const logout = async (req: Request, res: Response) => {
    const user = getUser(req, res)
    if(!user) {
        res.status(401).send("Questa operazione richiede il login")
        return
    }

    unsetUser(req, res)
    res.json({ message: "Logout effettuato con successo" })
}

export const getProfile = async (req: Request, res: Response) => {
    const user = getUser(req, res)
    res.json({})
}
