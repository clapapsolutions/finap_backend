import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } from 'graphql';

const ExpenseType = new GraphQLObjectType({
  name: 'Expense',
  fields: () => ({
    id: { type: GraphQLString },
    userExpenseTimestamp: { type: GraphQLString },
    expenseName: { type: GraphQLString },
    expenseDesc: { type: GraphQLString },
    expenseAmount: { type: GraphQLFloat },
    expenseAccount: { type: GraphQLString },
    expenseCategory: { type: GraphQLString },
    isSharedExpense: { type: GraphQLBoolean },
    userEmail: { type: GraphQLString }
  }),
});

export default ExpenseType;
