import { IAccount } from './IAccounts';
import { IReturnCashback } from './IReturnCashback';
import { IReturnTransactions } from './IReturnTransactions';

export interface IAccountAndTransactionModel {
    createAccount(
        cpfCnpj:string, name: string, password: string, status: boolean
    ): Promise<number>,
    updateAccount(
        accountId: number, cpfCnpj:string, name: string, password: string, status: boolean
    ): Promise<number | null>,
    findAccount(accountId: number): Promise<IAccount | null>,
    createTransaction(
        originAccountId: number, 
        destinationAccountId: number,
        value: number,
        date: Date,
    ): Promise<number>,
    findAllTransactions(origenAccountId: number): Promise<IReturnTransactions[] | null>,
    registerCashback(transactionId: number, cashback: number): Promise<IReturnCashback | null>,
}
