import { GraphQLID, GraphQLList } from 'graphql';
import ExpenseType from '../types/ExpenseType.js';
import Expense from '../../models/expenseModel.js';

const ExpenseQueries = {
  expenses: {
    type: new GraphQLList(ExpenseType),
    resolve(parent: any, args: any) {
      return Expense.find({});
    }
  },
  expense: {
    type: ExpenseType,
    args: { id: { type: GraphQLID } },
    resolve(parent: any, args: { id: any; }) {
      return Expense.findById(args.id);
    }
  }
};

export default ExpenseQueries;
