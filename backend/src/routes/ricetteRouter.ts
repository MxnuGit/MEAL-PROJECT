import { Router } from "express";
import * as ricetteController from "../controller/ricetteController"

const router: Router = Router()

router.get("/api/ricette", ricetteController.allRecipes)

export default router