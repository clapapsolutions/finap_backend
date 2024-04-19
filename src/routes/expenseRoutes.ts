import express from "express"
const router = express.Router()

import {
  addExpenseItem,
  getAllExpenseItemByUser,
} from "../controllers/expenseController.js"

import { protect } from '../middleware/authMiddleware.js'

router.route("/add_expense").post(protect, addExpenseItem)
router.route("/get_expenses_by_user").post(protect, getAllExpenseItemByUser)

export default router
