import { Router } from "express"
import * as userController from "../controller/userController"

const router: Router = Router()

router.get("/user/:username", userController.userByID)

export default router