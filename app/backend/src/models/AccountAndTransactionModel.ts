import { Transaction } from "sequelize";
import SequelizeAccount from "../database/models/SequelizeAccount";
import SequelizeTransiction from "../database/models/SequelizeTransiction";
import { IAccount } from "../interfaces/IAccounts";
import { IReturnTransictions } from "../interfaces/IReturnTransictions";
import { ITransiction } from "../interfaces/ITransiction";
import { IReturnCashback } from "../interfaces/IReturnCashback";
import { IAccountAndTransictionModel } from "../interfaces/IAccountAndTransictionModel";

class AccountAndTransictionModel implements IAccountAndTransictionModel {
    private sequelizeAccount = SequelizeAccount;
    private sequelizeTransaction = SequelizeTransiction;

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
        const response = await this.sequelizeTransaction.create({originAccountId, destinationAccountId, value, date});
        return response.dataValues.transictionId;
    }

    async findAllTransactions(origenAccountId: number): Promise<IReturnTransictions[] | null> {
        const response = await this.sequelizeTransaction.findAll({ where: { originAccountId: origenAccountId }});
        if (!response) {
            return null;
        }
        const transactions: IReturnTransictions[] = response
            .map((transaction) => ({
                transictionId: transaction.dataValues.transictionId,
                accountId: transaction.dataValues.destinationAccountId,
                date: transaction.dataValues.date,
                value: transaction.dataValues.value,
                cashback: transaction.dataValues.cashback,
            }));
        return transactions;
    }

    async registerCashback(transictionId: number, cashback: number): Promise<IReturnCashback | null> {
        const updateTransiction = await this.sequelizeTransaction.update(
            { cashback },
            { where: { transictionId}}
        );
        if (!updateTransiction) {
            return null;
        }
        const response = await this.sequelizeTransaction.findByPk(transictionId);
        const transictionWithCashback: IReturnCashback = {
            transictionId: response?.dataValues.transictionId,
            cashback: response?.dataValues.cashback,
        }
        return transictionWithCashback;
    }
}

export default AccountAndTransictionModel;