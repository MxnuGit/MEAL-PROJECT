import { Router } from "express"
import * as utentiController from "../controller/userController"

const router: Router = Router()

router.get("/api/utente/:ID", utentiController.userByID)

export default router