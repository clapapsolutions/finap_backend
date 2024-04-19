import { GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLBoolean } from 'graphql';
import ExpenseType from '../types/ExpenseType.js';
import Expense from '../../models/expenseModel.js';

const ExpenseMutations = {
  addExpense: {
    type: ExpenseType,
    args:{
        userExpenseTimestamp:{type:new GraphQLNonNull(GraphQLString)},
        expenseName:{type:new GraphQLNonNull(GraphQLString)},
        expenseDesc:{type:new GraphQLNonNull(GraphQLString)},
        expenseAmount:{type:new GraphQLNonNull(GraphQLFloat)},
        expenseAccount:{type:new GraphQLNonNull(GraphQLString)},
        expenseCategory:{type:new GraphQLNonNull(GraphQLString)},
        isSharedExpense:{type:new GraphQLNonNull(GraphQLBoolean)},
        userEmail:{type:new GraphQLNonNull(GraphQLString)}
        // Add other fields as needed
    },
    resolve(parent: any,args: { userExpenseTimestamp: any; expenseName: any; expenseDesc: any; expenseAmount: any; expenseAccount: any; expenseCategory: any; isSharedExpense: any; userEmail: any; }){
        let expense = new Expense({
            userExpenseTimestamp: args.userExpenseTimestamp,
            expenseName: args.expenseName,
            expenseDesc: args.expenseDesc,
            expenseAmount: args.expenseAmount,
            expenseAccount: args.expenseAccount,
            expenseCategory: args.expenseCategory,
            isSharedExpense: args.isSharedExpense,
            userEmail: args.userEmail
            // Add other fields as needed
        });
        return expense.save();
    }
  }
};

export default ExpenseMutations;
