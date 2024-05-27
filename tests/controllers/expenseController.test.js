// addExpenseItem.test.js

import {addExpenseItem} from '../../dist/src/controllers/expenseController.js'
import Expense from '../../dist/src/models/expenseModel.js'
import asyncHandler from 'express-async-handler';
import sinon from 'sinon';

describe('addExpenseItem', () => {
    let req, res, expenseStub;

    beforeEach(() => {
        req = {
            body: {
                userExpenseTimestamp: '2023-05-16T12:00:00Z',
                expenseName: 'Test Expense',
                expenseDesc: 'This is a test expense',
                expenseAmount: 100.0,
                expenseAccount: 'Test Account',
                expenseCategory: 'Test Category',
                isSharedExpense: false,
                userEmail: 'test@example.com',
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        expenseStub = sinon.stub(Expense.prototype, 'save').resolves({
            _id: 'mocked_id',
            userExpenseTimestamp: '2023-05-16T12:00:00Z',
            expenseName: 'Test Expense',
            expenseDesc: 'This is a test expense',
            expenseAmount: 100.0,
            expenseAccount: 'Test Account',
            expenseCategory: 'Test Category',
            isSharedExpense: false,
            userEmail: 'test@example.com',
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should create a new expense and return it', async () => {
        await addExpenseItem(req, res);

        expect(expenseStub.calledOnce).toBeTruthy();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            createdExpense: {
                _id: 'mocked_id',
                userExpenseTimestamp: '2023-05-16T12:00:00Z',
                expenseName: 'Test Expense',
                expenseDesc: 'This is a test expense',
                expenseAmount: 100.0,
                expenseAccount: 'Test Account',
                expenseCategory: 'Test Category',
                isSharedExpense: false,
                userEmail: 'test@example.com',
            },
        });
    });
});
