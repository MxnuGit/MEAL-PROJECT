import { Router } from "express";
import * as recipesController from "../controller/recipesController"

const router: Router = Router()

router.get("/api/recipe/:recipeName", recipesController.recipeByName);
router.get("/api/recipes/me", recipesController.recipesByLoggedUser);
router.get("/api/users/:username/recipes", recipesController.recipesByUsername);
router.get("/api/recipes/:id", recipesController.recipesByID);
router.get("/api/recipes/:id/ingredients", recipesController.ingredientsByID);
router.get("/api/recipes/:id/steps", recipesController.stepsByID)
router.post("/api/createRecipe", recipesController.createRecipe);

router.delete("/api/deleteRecipe/:id", recipesController.deleteRecipe);

export default router