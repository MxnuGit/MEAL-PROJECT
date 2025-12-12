import { Request, Response } from "express"
import { connection } from "../utils/db.js"

export async function recipeByName(req: Request, res: Response){
    connection.execute(
        'SELECT * FROM recipes WHERE name = ?',
        [req.params.recipeName],
        function(err, results, fields){
            res.json(results)
        }
    )
}