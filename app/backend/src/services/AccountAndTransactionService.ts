import { IAccountAndTransactionModel } from '../interfaces/IAccountAndTransactionModel';
import { IAccount } from '../interfaces/IAccounts';
import { IReturnCashback } from '../interfaces/IReturnCashback';
import { IReturnTransactions } from '../interfaces/IReturnTransactions';
import AccountAndTransactionModel from '../models/AccountAndTransactionModel';
import { ServiceResponse } from '../types/ServiceResponse';

class AccountAndTransactionService {
    private accountAndTransactionModel: 
        IAccountAndTransactionModel = new AccountAndTransactionModel();

    public async createAccount(
        cpfCnpj:string, name: string, password: string, status: boolean
    ): Promise<ServiceResponse<number>> {
        const response = await this.accountAndTransactionModel.createAccount(
            cpfCnpj, name, password, status
        );
        if (!response) {
            return { statusHttp: 'CONFLICT', data: { message: 'conflict' } };
        }
        return { statusHttp: 'CREATED', data: response };
    }

    public async updateAccount(
        accountId: number, cpfCnpj:string, name: string, password: string, status: boolean
    ): Promise<ServiceResponse<number>> {
        const response = await this.accountAndTransactionModel.updateAccount(
            accountId, cpfCnpj, name, password, status
        );
        if (!response) {
            return { statusHttp: 'NOT_FOUND', data: { message: 'account not found' } };
        }
        return { statusHttp: 'SUCCESSFUL', data: response };
    }

    public async findAccount(accountId: number): Promise<ServiceResponse<IAccount>> {
        const response = await this.accountAndTransactionModel.findAccount(accountId);
        if (!response) {
            return { statusHttp: 'NOT_FOUND', data: { message: 'account not found' } };
        }
        return { statusHttp: 'SUCCESSFUL', data: response };
    }

    public async createTransaction(
        originAccountId: number, 
        destinationAccountId: number,
        value: number,
        date: Date,
    ): Promise<ServiceResponse<number>> {
        const response = await this.accountAndTransactionModel.createTransaction(
            originAccountId, destinationAccountId, value, date,
        );
        if (!response) {
            return { statusHttp: 'CONFLICT', data: { message: 'conflict' } };
        }
        return { statusHttp: 'CREATED', data: response };
    }

    public async findAllTransactions(
        origenAccountId: number
    ): Promise<ServiceResponse<IReturnTransactions[] | null>> {
        const response = await this.accountAndTransactionModel.findAllTransactions(
            origenAccountId
        );
        if (!response) {
            return { statusHttp: 'NOT_FOUND', data: { message: 'account not found' } };
        }
        return { statusHttp: 'SUCCESSFUL', data: response };
    }

    public async registerCashback(
        transactionId: number, cashback: number
    ): Promise<ServiceResponse<IReturnCashback | null>> {
        const response = await this.accountAndTransactionModel.registerCashback(
            transactionId, cashback
        );
        if (!response) {
            return { statusHttp: 'NOT_FOUND', data: { message: 'account not found' } };
        }
        return { statusHttp: 'SUCCESSFUL', data: response };
    }
}

export default AccountAndTransactionService;
