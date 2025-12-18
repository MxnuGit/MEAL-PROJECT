import { Router } from "express";
import * as recipesController from "../controller/recipesController"

const router: Router = Router()

router.get("/api/recipe/:recipeName", recipesController.recipeByName)
router.post("/api/createRecipe", recipesController.createRecipe)
router.delete("/api/createRecipe", recipesController.createRecipe)

export default router