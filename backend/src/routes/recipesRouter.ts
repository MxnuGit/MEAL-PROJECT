import { Router } from "express";
import * as recipeController from "../controller/recipesController"

const router: Router = Router()

<<<<<<< HEAD
router.get("/api/recipe", recipeController.allRecipes)
=======
router.get("/ricette/:recipeName", ricetteController.recipeByName)
>>>>>>> 33a01204e9dd170372ddd6f026f90d96efed2f59

export default router