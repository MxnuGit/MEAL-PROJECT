import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function userByID(req: Request, res: Response) {
    connection.execute(
        `SELECT ID
         FROM utente`,
         [req.params.ID],
         function(err, results, fields) {
            res.json(results)
        }
    )
}