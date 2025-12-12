import { Request, Response } from "express"
import { connection } from "../utils/db.js"
import type { User } from "../utils/auth.js"
import { RowDataPacket } from "mysql2";

// export async function userByID(req: Request, res: Response) {
//     connection.execute(
//         `SELECT ID
//          FROM utente
//          where ID like ?`,
//          [req.params.ID],
//          function(err, results: any[], fields) {
//             res.json(results)
//         }
//     )
// }


export const userByID = async (req: Request, res: Response) => {

    const [rows] = await connection.execute<RowDataPacket[]>(
        "SELECT username FROM users WHERE username=?",
        [req.params.ID]
    )

    const user = rows[0];
    res.json(user)
}