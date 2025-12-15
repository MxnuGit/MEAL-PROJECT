import { Request, Response } from "express"
import { connection } from "../utils/db"
import type { User } from "../utils/auth"
import { RowDataPacket } from "mysql2";

export async function userByID(req: Request, res: Response) {
    connection.execute(
        `SELECT ID
         FROM utente
         where ID like ?`,
         [req.params.ID],
         function(err, results: any[], fields) {
            res.json(results)
        }
    )
}
