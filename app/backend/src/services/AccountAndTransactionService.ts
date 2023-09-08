import { IAccountAndTransictionModel } from "../interfaces/IAccountAndTransictionModel";
import { IAccount } from "../interfaces/IAccounts";
import { IReturnCashback } from "../interfaces/IReturnCashback";
import { IReturnTransictions } from "../interfaces/IReturnTransictions";
import AccountAndTransictionModel from "../models/AccountAndTransactionModel";
import { ServiceResponse } from "../types/ServiceResponse";

class AccountAndTransactionService {
    private accountAndTransactionModel: IAccountAndTransictionModel = new AccountAndTransictionModel();

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
    ): Promise<ServiceResponse<IReturnTransictions[] | null>> {
        const response = await this.accountAndTransactionModel.findAllTransactions(
            origenAccountId
        );
        if (!response) {
            return { statusHttp: 'NOT_FOUND', data: { message: 'account not found' } };
        }
        return { statusHttp: 'SUCCESSFUL', data: response };
    }

    public async registerCashback(
        transictionId: number, cashback: number
    ): Promise<ServiceResponse<IReturnCashback | null>> {
        const response = await this.accountAndTransactionModel.registerCashback(
            transictionId, cashback
        );
        if (!response) {
            return { statusHttp: 'NOT_FOUND', data: { message: 'account not found' } };
        }
        return { statusHttp: 'SUCCESSFUL', data: response };
    }
}

export default AccountAndTransactionService;
