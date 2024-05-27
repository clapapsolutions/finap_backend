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
      $match: {
        userEmail: userEmail
      }
    }, {
      $project: {
        convertedDate: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$userExpenseTimestamp'
          }
        },
        userExpenseTimestamp: 1,
        expenseName: 1,
        expenseDesc: 1,
        expenseAmount: 1,
        expenseAccount: 1,
        expenseCategory: 1
      }
    }, {
      $group: {
        _id: '$convertedDate',
        expenses: {
          $push: {
            _id: '$_id',
            userExpenseTimestamp: '$userExpenseTimestamp',
            expenseName: '$expenseName',
            expenseDesc: '$expenseDesc',
            expenseAmount: '$expenseAmount',
            expenseAccount: '$expenseAccount',
            expenseCategory: '$expenseCategory'
          }
        }
      }
    }, {
      $sort: {
        _id: -1
      }
    }
  ]

  // @ts-ignore
  const expensesBydate = await Expense.aggregate(pipeline)

  res.status(200).send(expensesBydate)
})

export { addExpenseItem, getAllExpenseItemByUser }
