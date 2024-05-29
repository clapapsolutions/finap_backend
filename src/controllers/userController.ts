import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"
import { Request, Response } from "express"

//@desc    Register a new user
//@route   POST /api/users/add_new_user
//@access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("User Already Exists")
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error("Invalid User Data")
  }
})

//@desc    Auth user and get token
//@route   GET /api/users/login
//@access  Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid Email or Password")
  }
})

//@desc    Get user Profile
//@route   POST /api/users/profile
//@access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.body
  const user = await User.findById(userId)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      accounts: user.account,
      expenseCategories: user.category,
      currency: user.currency,
      createdAt: user.createdAt,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

export { registerUser, authUser, getUserProfile }
