import { Request, Response } from "express"
import { connection } from "../utils/db"

export function userByID(req: Request, res: Response) {
    const search = req.query.search as string

    if (!search) {
        return res.json([])
    }

    connection.execute(
        "SELECT username FROM users WHERE username LIKE ?",
        [`${search}%`],
        (err, results: any[]) => {
            if (err) {
                return res.status(500).json(err)
            }
            res.json(results)
        }
    )
}

export function getUsername(req: Request, res: Response){
    connection.execute(
        "SELECT username FROM users WHERE username = ?",
        [req.params.username],
        (err, results: any[]) => {
            if (err) {
                return res.status(500).json(err)
            }
            res.json(results)
        }
    )
}