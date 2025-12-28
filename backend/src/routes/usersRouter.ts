import { Router } from "express"
import * as usersController from "../controller/usersController"

const router: Router = Router()

router.get("/api/user/", usersController.userByID)
router.get("/api/username/:username", usersController.getUsername)

export default router