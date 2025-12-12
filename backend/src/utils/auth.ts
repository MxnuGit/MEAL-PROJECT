import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface User {
    id: number
    username: string
    role: "admin" | "user"
}

const JWT_SECRET = "cicciogamer89"
const COOKIE_NAME = "meal-access-token"

export const setUser = (req: Request, res: Response, user: any) => {
    const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: 86_400_000})
}

export const getUser = (req: Request, res: Response) => {}

export const unsetUser = (req: Request, res: Response) => {}