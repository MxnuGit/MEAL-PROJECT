import { Router } from "express";
import * as authController from "../controller/authController" 

const router = Router()

router.post("/api/auth/register", authController.register)
router.post("/api/auth/login", authController.login)
router.post("/api/auth/register", authController.logout)
router.get("/api/auth/register", authController.getProfile)

export default router
