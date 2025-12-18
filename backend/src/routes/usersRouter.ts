import { Router } from "express"
import * as usersController from "../controller/usersController"

const router: Router = Router()

router.get("/api/user/:username", usersController.userByID)

export default router