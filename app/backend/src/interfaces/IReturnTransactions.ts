export interface IReturnTransactions {
    transactionId?: number;
    accountId: number;
    date: Date;
    value: number;
    cashback?: number;
}