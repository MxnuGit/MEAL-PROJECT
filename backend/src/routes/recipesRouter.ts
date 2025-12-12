import { Router } from "express";
import * as recipeController from "../controller/recipesController"

const router: Router = Router()

router.get("/api/recipe", recipeController.allRecipes)

export default router