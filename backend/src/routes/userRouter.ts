import { Router } from "express"
import * as utentiController from "../controller/userController"

const router: Router = Router()

router.get("/utente/:username", utentiController.userByID)

export default router