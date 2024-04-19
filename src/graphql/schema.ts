import { GraphQLSchema,GraphQLObjectType } from 'graphql';
import UserQueries from './queries/UserQuery.js';
import UserMutations from './mutations/UserMutation.js';
import ExpenseQueries from './queries/ExpenseQuery.js';
import ExpenseMutations from './mutations/ExpenseMutation.js';

const schema = new GraphQLSchema({
  query:new GraphQLObjectType({
      name:'Query',
      fields:{
          ...UserQueries,
          ...ExpenseQueries
      }
  }),
  mutation:new GraphQLObjectType({
      name:'Mutation',
      fields:{
          ...UserMutations,
          ...ExpenseMutations
      }
  })
});

export default schema;
