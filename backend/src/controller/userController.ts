import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function userByID(req: Request, res: Response) {
    connection.execute(
        `SELECT ID, immagine
         FROM utente
         where ID like ?`,
         [req.params.ID],
         function(err, results, fields) {
            res.json(results)
        }
    )
}