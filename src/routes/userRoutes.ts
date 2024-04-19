import express from "express"
const router = express.Router()

import { registerUser, authUser } from "../controllers/userController.js"


router.route("/add_user").post(registerUser)
router.route("/auth_user").post(authUser)

export default router
