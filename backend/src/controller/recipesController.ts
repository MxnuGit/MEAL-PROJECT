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

export async function recipesByLoggedUser(req: Request, res: Response) {
    const user = getUser(req, res);

    if (!user) {
        return res.status(401).json({ error: "Non autenticato" });
    }

    connection.execute(
        `SELECT * FROM recipes WHERE USERS_username = ?`,
        [user.username],
        (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        }
    );
}

export async function recipesByUsername(req: Request, res: Response) {
    const { username } = req.params;

    connection.execute(
        "SELECT * FROM recipes WHERE USERS_username = ?",
        [username],
        (err, results) => {
            if (err) return res.sendStatus(500);
            res.json(results);
        }
    );
}

export async function recipesByID(req: Request, res: Response) {
    const { id } = req.params;

    connection.execute(
        "SELECT * FROM recipes WHERE recipe_id = ?",
        [id],
        (err, results: any[]) => {
            if (err) return res.sendStatus(500);
            res.json(results[0] ?? null);
        }
    );
}

export async function ingredientsByID(req: Request, res: Response) {
    const { id } = req.params;

    connection.execute(
        `SELECT has.INGREDIENTS_name AS name, has.quantity AS quantity, measured_in.UNIT_OF_MEASUREMENT_measurement as unit
        FROM has JOIN recipes JOIN measured_in ON has.RECIPES_recipe_id = recipes.recipe_id and measured_in.INGREDIENTS_name = has.INGREDIENTS_name
        WHERE recipes.recipe_id = ?`,
        [id],
        (err, results: any[]) => {
            if (err) return res.sendStatus(500);
            res.json(results);
        }
    );
}

export async function stepsByID(req: Request, res: Response) {
    const { id } = req.params;

    connection.execute(
        `SELECT preparations.step_number AS stepNumber, preparations.step_desc AS stepDesc
        FROM preparations
        WHERE RECIPES_recipe_id = 1;
        `,
        [id],
        (err, results: any[]) => {
            if (err) return res.sendStatus(500);
            res.json(results);
        }
    );
}

export async function createRecipe(req: Request, res: Response){
    const user = getUser(req, res)
    if(!user) {
        res.status(401).send("Creare il post richiede il login")
        return 
    }

    connection.execute(
        'INSERT INTO ',
        [req.params.name],
        function(err, results, fields){
            res.json(results)
        }
    )
}

export async function deleteRecipe(req: Request, res: Response){
    const user = getUser(req, res)
    if(!user) {
        res.status(401).send("Eliminare il post richiede il login")
        return 
    }

    const results = connection.execute("SELECT * FROM recipes WHERE USERS_username = ?", 
        [user.username])
    if (!Array.isArray(results) || results.length === 0) {
        res.status(400).send("Ricette non trovate")
        return
      }

    const recipe = results[0] as any

    connection.execute(
        'DELETE FROM recipes WHERE USERS_username = ? and recipe_id = ?',
        [user.username, recipe.id],
        function(err, results, fields){
            res.json(results)
        }
    )
}