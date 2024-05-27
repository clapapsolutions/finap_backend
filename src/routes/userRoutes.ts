import express from "express"
const router = express.Router()

import {registerUser, authUser, getUserProfile} from "../controllers/userController.js"


router.route("/add_user").post(registerUser)
router.route("/auth_user").post(authUser)
router.route("/profile").get(getUserProfile)

export default router
