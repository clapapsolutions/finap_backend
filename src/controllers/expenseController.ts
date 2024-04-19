import asyncHandler from "express-async-handler"
import Expense from "../models/expenseModel.js"

//@desc    Create new Expense
//@route   POST /api/addExpense
//@access  Private
const addExpenseItem = asyncHandler(async (req, res) => {
  const {
    userExpenseTimestamp,
    expenseName,
    expenseDesc,
    expenseAmount,
    expenseAccount,
    expenseCategory,
    isSharedExpense,
    userEmail,
  } = req.body

  const expense = new Expense({
    userExpenseTimestamp,
    expenseName,
    expenseDesc,
    expenseAmount,
    expenseAccount,
    expenseCategory,
    isSharedExpense,
    userEmail,
  })

  const createdExpense = await expense.save()

  res.status(201).json({ createdExpense })
})

//@desc    Get Expenses
//@route   POST /api/addExpense
//@access  Private
const getAllExpenseItemByUser = asyncHandler(async (req, res) => {
  const { userEmail } = req.body
  if (!userEmail) {
    res.status(400).send("User Not Provided")
  }

  const pipeline = [
    {
      $match:
        /**
         * query: The query in MQL.
         */
        {
          userEmail: userEmail,
        },
    },
    {
      $group:
        /**
         * _id: The id of the group.
         * fieldN: The first field name.
         */
        {
          _id: "$userExpenseTimestamp",
          expenses: {
            $push: {
              _id: "$_id",
              userExpenseTimestamp: "$userExpenseTimestamp",
              expenseName: "$expenseName",
              expenseDesc: "$expenseDesc",
              expenseAmount: "$expenseAmount",
              expenseAccount: "$expenseAccount",
              expenseCategory: "$expenseCategory",
            },
          },
        },
    },
  ]

  const expensesBydate = await Expense.aggregate(pipeline)

  res.status(200).send(expensesBydate)
})

export { addExpenseItem, getAllExpenseItemByUser }
