import { GraphQLNonNull, GraphQLString } from "graphql";
import UserType from "../types/UserType.js";
import User from "../../models/userModel.js";

const UserMutations = {
  addUser: {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      // Add other fields as needed
    },
    async resolve(
      parent: any,
      args: { name: string; email: string; password: string }
    ) {
      const userExists = await User.findOne({ email: args.email });
      if (userExists) {
        throw new Error("User Already Exists");
      }
      const newUser = new User({
        name: args.name,
        email: args.email,
        password: args.password,
        // Add other fields as needed
      });
      newUser.save();
      return newUser;
    },
  },
};

export default UserMutations;
