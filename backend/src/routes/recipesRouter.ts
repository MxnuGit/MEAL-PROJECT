import { Router } from "express";
import * as recipesController from "../controller/recipesController"

const router: Router = Router()

router.get("/api/recipe/:recipeName", recipesController.recipeByName)
router.get("/api/recipes/me", recipesController.recipesByLoggedUser);
router.post("/api/createRecipe", recipesController.createRecipe)
router.delete("/api/deleteRecipe", recipesController.deleteRecipe)

export default router