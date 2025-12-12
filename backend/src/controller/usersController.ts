import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function userByID(req: Request, res: Response) {
    connection.execute(
        `SELECT username
         FROM users
         where username = ?`,
         [req.params.username],
         function(err, results: any[], fields) {
            res.json(results)
        }
    )
}