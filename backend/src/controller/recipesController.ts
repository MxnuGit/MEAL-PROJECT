import { Request, Response } from "express"
import { connection } from "../utils/db"
import { getUser } from "../utils/auth"

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
    const user = getUser(req, res)
    if(!user) {
        res.status(401).send("Creare il post richiede il login")
        return 
    }
    const results = connection.execute("SELECT * FROM recipes WHERE users_username =?", 
        [req.params.username])
    if (!Array.isArray(results) || results.length === 0) {
        res.status(400).send("Post non trovato")
        return
      }

    const recipe = results[0] as any

    if(recipe.authorId != user.username && user.role != "admin") {
        res.status(401).send("Non possiedi i permessi necessari per eliminare il post")
        return
    }
    
    connection.execute(
        'DELETE FROM recipes WHERE name = ?',
        [req.params.name],
        function(err, results, fields){
            res.json(results)
        }
    )
}

export async function deleteRecipe(req: Request, res: Response){
    const user = getUser(req, res)
    if(!user) {
        res.status(401).send("Creare il post richiede il login")
        return 
    }
    connection.execute(
        'INSERT INTO recipes (name, usernameCreator)',
        [req.body.name, user.username],
        function(err, results, fields){
            res.json(results)
        }
    )
}