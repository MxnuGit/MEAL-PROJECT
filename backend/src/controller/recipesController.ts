import { Request, Response } from "express"
import { connection } from "../utils/db"
import { getUser } from "../utils/auth"

export async function recipeByName(req: Request, res: Response){
    const search = req.query.search as string

    if (!search) {
        return res.json([])
    }

    connection.execute(
        'SELECT * FROM recipes WHERE name LIKE ?',
        [`${search}%`],
        (err, results: any[]) => {
            if (err) {
                return res.status(500).json(err)
            }
            res.json(results)
        }
    )
}

export async function allRecipes(req: Request, res: Response) {
  connection.execute(
    "SELECT * FROM recipes ORDER BY recipe_id desc",
    [],
    (err, results: any[]) => {
      if (err) return res.status(500).json(err)
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
        WHERE RECIPES_recipe_id = ?;
        `,
        [id],
        (err, results: any[]) => {
            if (err) return res.sendStatus(500);
            res.json(results);
        }
    );
}

export async function createRecipe(req: Request, res: Response) {
  const user = getUser(req, res);
  if (!user) {
    return res.status(401).send("Creare il post richiede il login");
  }

  const {
    name,
    course,
    people,
    recipe_image,
    description,
    difficulty,
    prep_time,
    isGlutenFree,
    isLactoseFree,
    isProteinRich,
    isVegan,
    ingredients,
    steps
  } = req.body;

  /* ---------------- VALIDAZIONI ---------------- */
  if (!name || !difficulty || !prep_time) {
    return res.status(400).send("Campi obbligatori mancanti");
  }

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).send("Inserire almeno un ingrediente");
  }

  if (!Array.isArray(steps) || steps.length === 0) {
    return res.status(400).send("Inserire almeno uno step");
  }

  /* ---------------- IMAGE FIX ---------------- */
  let imageBuffer: Buffer;
  if (typeof recipe_image === "string" && recipe_image.startsWith("data:")) {
    imageBuffer = Buffer.from(recipe_image.split(",")[1], "base64");
  } else {
    imageBuffer = Buffer.alloc(0);
  }

  /* ---------------- TRANSACTION ---------------- */
  connection.beginTransaction(err => {
    if (err) return res.status(500).json(err);

    /* ---------- INSERT RECIPE ---------- */
    connection.query(
      `INSERT INTO recipes (
        name, prep_time, difficulty, description, course, people,
        isVegan, isLactoseFree, isGlutenFree, isProteinRich,
        USERS_username, recipe_image
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        prep_time,
        difficulty,
        description,
        course,
        people,
        isVegan,
        isLactoseFree,
        isGlutenFree,
        isProteinRich,
        user.username,
        imageBuffer
      ],
      (err: any, recipeResult: any) => {
        if (err) {
          return connection.rollback(() =>
            res.status(500).json({ code: err.code, message: err.sqlMessage })
          );
        }

        const recipeId = recipeResult.insertId;

        /* ---------- INGREDIENTS ---------- */
        const ingredientNames = ingredients.map((i: any) => [i.name]);
        const units = ingredients.map((i: any) => [i.unit]);
        const measured = ingredients.map((i: any) => [i.name, i.unit]);
        const hasValues = ingredients.map((i: any) => [
          recipeId,
          i.name,
          i.quantity
        ]);
        const stepValues = steps.map((s: any) => [
          recipeId,
          s.stepNumber,
          s.stepDesc
        ]);

        connection.query(
          `INSERT IGNORE INTO ingredients (name) VALUES ?`,
          [ingredientNames],
          err => {
            if (err) return rollback(err);

            connection.query(
              `INSERT IGNORE INTO unit_of_measurement (measurement) VALUES ?`,
              [units],
              err => {
                if (err) return rollback(err);

                connection.query(
                  `INSERT IGNORE INTO measured_in
                   (INGREDIENTS_name, UNIT_OF_MEASUREMENT_measurement)
                   VALUES ?`,
                  [measured],
                  err => {
                    if (err) return rollback(err);

                    connection.query(
                      `INSERT INTO has
                       (RECIPES_recipe_id, INGREDIENTS_name, quantity)
                       VALUES ?`,
                      [hasValues],
                      err => {
                        if (err) return rollback(err);

                        connection.query(
                          `INSERT INTO preparations
                           (RECIPES_recipe_id, step_number, step_desc)
                           VALUES ?`,
                          [stepValues],
                          err => {
                            if (err) return rollback(err);

                            connection.commit(err => {
                              if (err) return rollback(err);
                              res.status(201).json({ recipeId });
                            });
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );

        function rollback(err: any) {
          return connection.rollback(() =>
            res.status(500).json({
              code: err.code,
              message: err.sqlMessage
            })
          );
        }
      }
    );
  });
}

export async function deleteRecipe(req: Request, res: Response){
    const user = getUser(req, res)
    if(!user) {
        res.status(401).send("Eliminare il post richiede il login")
        return 
    }

    connection.execute(
        'DELETE FROM recipes WHERE recipe_id = ?',
        [req.params.id],
        function(err, results, fields){
            res.json(results)
        }
    )
}

export async function recipesByIngredients(req: Request, res: Response){
  const ingredients = req.params.list
  ingredients.split(",")

  const length = ingredients.length

    connection.execute(
        `SELECT has.RECIPES_recipe_id 
         FROM has WHERE INGREDIENTS_name IN (?) 
         GROUP BY has.RECIPES_recipe_id 
         HAVING COUNT(DISTINCT INGREDIENTS_name) = ?}`,
        [ingredients, length],
        function(err, results, fields){
            res.json(results)
        }
    )
}