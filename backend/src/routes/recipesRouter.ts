import { Router } from "express";
import * as ricetteController from "../controller/recipesController"

const router: Router = Router()

router.get("/api/ricette", ricetteController.allRecipes)

export default router