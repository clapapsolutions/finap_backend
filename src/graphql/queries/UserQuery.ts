import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import UserType, { LoginType } from "../types/UserType.js";
import User from "../../models/userModel.js";
import jwt from "jsonwebtoken";

const UserQueries = {
  users: {
    type: new GraphQLList(UserType),
    resolve(parent: any, args: any) {
      return User.find({});
    },
  },
  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve(parent: any, args: { id: any }) {
      return User.findById(args.id);
    },
  },
  login: {
    type: LoginType,
    args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
    resolve: async (
      parent: any,
      {
        email,
        password,
      }: {
        email: string;
        password: string;
      }
    ) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User does not exist!");
      }
      //@ts-ignore
      const isEqual = await user.matchPassword(password);
      if (!isEqual) {
        throw new Error("Password is incorrect!");
      }
      if (!user.token) {
        user.token = jwt.sign(
          { userId: user.id, email: user.email }, // check for expiry here instead of availability
          "somesupersecretkey"
        );
        user.save();
      }
      return {
        id: user.id,
        token: user.token,
        name: user.name,
        email: user.email,
      };
    },
  },
};

export default UserQueries;
