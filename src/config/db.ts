import mongoose from "mongoose"
import dotenv from "dotenv"
// import logger from "../../logger/winstonLogger.js"
dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI!
const MONDODB_DATABASE = process.env.MONDODB_DATABASE

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${MONGODB_URI}/${MONDODB_DATABASE}`)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error: any) {
    console.error(`Error : ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
