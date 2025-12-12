import { Router } from "express";
import * as recipesController from "../controller/recipesController"

const router: Router = Router()

router.get("/recipe/:recipeName", recipesController.recipeByName)

export default router