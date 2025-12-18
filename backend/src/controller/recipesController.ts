import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function allRecipesByUsername(req: Request, res: Response){
    connection.execute(
        'SELECT * FROM ricetta WHERE username=?',
        [req.params.username],
        function(err, results, fields){
            res.json(results)
        }
    )
}