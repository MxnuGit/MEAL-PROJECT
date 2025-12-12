import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function allRecipes(req: Request, res: Response){
    connection.execute(
        'SELECT * FROM recipes',
        [],
        function(err, results, fields){
            res.json(results)
        }
    )
}