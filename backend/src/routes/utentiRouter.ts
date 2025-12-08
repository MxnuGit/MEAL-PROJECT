import { Router } from "express"
import * as utentiController from "../controller/utentiController"

const router: Router = Router()

router.get("/api/utente/:id", utentiController.userByID)

export default router