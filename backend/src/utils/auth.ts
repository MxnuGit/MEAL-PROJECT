import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface User {
    username: string
    role: "admin" | "user"
}

const JWT_SECRET = "cicciogamer89"
const COOKIE_NAME = "meal-access-token"

export const setUser = (req: Request, res: Response, user: any) => {
    const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: 86_400_000})
    res.cookie(COOKIE_NAME, accessToken, {
        maxAge: 86_400_000,
        httpOnly: true,
        sameSite: true,
        // secure: true
    })
}

export const getUser = (req: Request, res: Response) => {
    const accessToken = req.cookies[COOKIE_NAME]
    if(!accessToken) return null
    try {
        const user = jwt.verify(accessToken, JWT_SECRET) as User
        return user
    } catch {
        return null
    }
}

export const unsetUser = (req: Request, res: Response) => {
    res.clearCookie(COOKIE_NAME)
}