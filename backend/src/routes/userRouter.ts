import { Router } from "express"
import * as utentiController from "../controller/userController.js"

const router: Router = Router()

router.get("/utente/:username", utentiController.userByID)

export default router