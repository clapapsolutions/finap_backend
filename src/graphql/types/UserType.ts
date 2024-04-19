import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    dateOfBirth: { type: GraphQLString },
    account: { type: new GraphQLList(GraphQLString) },
    category: { type: new GraphQLList(GraphQLString) },
    currency: { type: GraphQLString },
    token:{ type: GraphQLString },
  }),
});

export const LoginType = new GraphQLObjectType({
  name: 'LoginResponse',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token:{ type: GraphQLString },
  }),
});

export default UserType;