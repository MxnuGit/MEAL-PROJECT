import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function recipeByName(req: Request, res: Response){
    connection.execute(
        'SELECT * FROM recipes WHERE name = ?',
        [req.params.recipeName],
        function(err, results, fields){
            res.json(results)
        }
    )
}

export async function createRecipe(req: Request, res: Response){
    connection.execute(
        '',
        [],
        function(err, results, fields){
            res.json(results)
        }
    )
}