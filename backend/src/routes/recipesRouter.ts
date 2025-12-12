import { Router } from "express";
import * as ricetteController from "../controller/recipesController"

const router: Router = Router()

router.get("/api/recipe", ricetteController.allRecipes)

export default router