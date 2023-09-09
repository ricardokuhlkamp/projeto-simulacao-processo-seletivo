import { Request, Response } from 'express';
import AccountAndTransactionService from '../services/AccountAndTransactionService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class AccountAndTransactionController {
    private accountAndTransactionService = new AccountAndTransactionService();

    async createAccount(
        req: Request, res: Response
    ) {
        const { cpfCnpj, name, password, status } = req.body;
        console.log('cpfCnpj: ', cpfCnpj)
        const { statusHttp, data } = await this.accountAndTransactionService.createAccount(
            cpfCnpj, name, password, status
        );
        return res.status(mapStatusHTTP(statusHttp)).json(data);
    }

    async updateAccount(req: Request, res: Response) {
        const { cpfCnpj, name, password, status } = req.body;
        console.log('cpfCnpj2: ', cpfCnpj)
        const { id } = req.params;
        const accountId = +id;
        const { statusHttp, data } = await this.accountAndTransactionService.updateAccount(
            +accountId, cpfCnpj, name, password, status
        );
        return res.status(mapStatusHTTP(statusHttp)).json(data);
    }

    async findAccount(req: Request, res: Response) {
        const { id } = req.params;
        const accountId = +id;
        const { statusHttp, data } = await this.accountAndTransactionService
            .findAccount(+accountId);
        return res.status(mapStatusHTTP(statusHttp)).json(data);
    }

    async createTransaction(req: Request, res: Response) {
        const { destinationAccountId, value } = req.body;
        const { id } = req.params;
        const originAccountId = +id;
        const date = new Date();
        const { statusHttp, data } = await this.accountAndTransactionService
            .createTransaction(+originAccountId, destinationAccountId, value, date);
        return res.status(mapStatusHTTP(statusHttp)).json(data);
    }

    async findAllTransactions(req: Request, res: Response) {
        const { id } = req.params;
        const originAccountId = +id;
        const { statusHttp, data } = await this.accountAndTransactionService
            .findAllTransactions(originAccountId);
        return res.status(mapStatusHTTP(statusHttp)).json(data);
    }

    async registerCashback(req: Request, res: Response) {
        const { id } = req.params;
        console.log('id cahsback: ', id)
        const { cashback } = req.body;
        const transactionId = +id;
        const { statusHttp, data } = await this.accountAndTransactionService.registerCashback(
            transactionId, cashback
        );
        return res.status(mapStatusHTTP(statusHttp)).json(data);
    }
}

export default AccountAndTransactionController;