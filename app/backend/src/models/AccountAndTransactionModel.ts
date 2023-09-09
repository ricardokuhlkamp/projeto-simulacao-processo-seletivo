// import { Transaction } from 'sequelize';
import SequelizeAccount from '../database/models/SequelizeAccount';
import SequelizeTransaction from '../database/models/SequelizeTransaction';
import { IAccount } from '../interfaces/IAccounts';
import { IReturnTransactions } from '../interfaces/IReturnTransactions';
import { IReturnCashback } from '../interfaces/IReturnCashback';
import { IAccountAndTransactionModel } from '../interfaces/IAccountAndTransactionModel';

class AccountAndTransactionModel implements IAccountAndTransactionModel {
    private sequelizeAccount = SequelizeAccount;
    private sequelizeTransaction = SequelizeTransaction;

    async createAccount(
        cpfCnpj:string, name: string, password: string, status: boolean
    ): Promise<number> {
        const response = await this.sequelizeAccount.create(
            {cpfCnpj, name, password, status}
        );
        return response.dataValues.accountId;
    }

    async updateAccount(
        accountId: number, cpfCnpj:string, name: string, password: string, status: boolean
    ): Promise<number | null> {
        const existingAccount = await this.sequelizeAccount.findByPk(accountId);
        if (!existingAccount) {
            return null;
        }
        const [rowsUpdated] = await this.sequelizeAccount.update(
            { cpfCnpj, name, password, status },
            { where: { accountId } }
        );
        return rowsUpdated;
    }

    async findAccount(accountId: number): Promise<IAccount | null>{
        const response = await this.sequelizeAccount.findByPk(accountId);
        if (!response) {
            return null;
        }
        const account: IAccount = {
            accountId: response.dataValues.accountId,
            cpfCnpj: response.dataValues.cpfCnpj,
            name: response.dataValues.name,
            password: response.dataValues.password,
            status: response.dataValues.status,
        }
        return account;
    }

    async createTransaction(
        originAccountId: number, 
        destinationAccountId: number,
        value: number,
        date: Date,
    ): Promise<number> {
        const response = await this.sequelizeTransaction.create(
            {originAccountId, destinationAccountId, value, date}
        );
        return response.dataValues.transactionId;
    }

    async findAllTransactions(origenAccountId: number): Promise<IReturnTransactions[] | null> {
        const response = await this.sequelizeTransaction.findAll(
            { where: { originAccountId: origenAccountId }}
        );
        if (!response) {
            return null;
        }
        const transactions: IReturnTransactions[] = response
            .map((transaction) => ({
                transactionId: transaction.dataValues.transactionId,
                accountId: transaction.dataValues.destinationAccountId,
                date: transaction.dataValues.date,
                value: transaction.dataValues.value,
                cashback: transaction.dataValues.cashback,
            }));
        return transactions;
    }

    async registerCashback(
        transactionId: number, cashback: number
    ): Promise<IReturnCashback | null> {
        const updateTransaction = await this.sequelizeTransaction.update(
            { cashback }, { where: { transactionId}}
        );
        if (!updateTransaction) {
            return null;
        }
        const response = await this.sequelizeTransaction.findByPk(transactionId);
        const transactionWithCashback: IReturnCashback = {
            transactionId: response?.dataValues.transactionId,
            cashback: response?.dataValues.cashback,
        }
        return transactionWithCashback;
    }
}

export default AccountAndTransactionModel;