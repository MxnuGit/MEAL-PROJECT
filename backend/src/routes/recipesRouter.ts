import { Router } from "express";
import * as ricetteController from "../controller/recipesController"

const router: Router = Router()

router.get("/ricette/:recipeName", ricetteController.recipeByName)

export default router