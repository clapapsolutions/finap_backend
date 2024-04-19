import mongoose from "mongoose"

const expenseSchema = new mongoose.Schema(
  {
    userExpenseTimestamp: {
      type: Date,
      required: true,
    },
    expenseName: {
      type: String,
      required: true,
    },
    expenseDesc: {
      type: String,
      required: true,
    },
    expenseAmount: {
      type: Number,
      required: true,
    },
    expenseAccount: {
      type: String,
      required: true,
    },
    expenseCategory: {
      type: String,
      required: true,
    },
    isSharedExpense: {
      type: Boolean,
      required: false,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Expense = mongoose.model("Expense", expenseSchema)

export default Expense
