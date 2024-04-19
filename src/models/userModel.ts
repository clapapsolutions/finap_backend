import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Define interface for User document
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    dateOfBirth?: Date;
    account?: string[];
    category?: string[];
    currency?: string;
    token?: string;
    matchPassword(enteredPassword: string): Promise<boolean>;
}


const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    account: {
      required: false,
      type: Array,
      default: ["credit", "debit", "bank transfer", "cash"],
    },
    category: {
      required: false,
      type: [],
      default: ["eating out", "drinking out", "transportation"],
    },
    currency: {
      type: String,
      required: false,
      default: "USD",
    },
    token: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

//Method to Match incoming password
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  if (!enteredPassword) {
    throw new Error("Password is Missing, can not compare");
  }
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.log("Error While Comparing passwords");
      return false;
  }
};

// Define pre-save hook
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.token = jwt.sign(
    { userId: this.id, email: this.email },
    "somesupersecretkey"
  );
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
