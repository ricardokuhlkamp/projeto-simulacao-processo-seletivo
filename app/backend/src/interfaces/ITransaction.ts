export interface ITransaction {
    transactionId?: number;
    originAccountId: number;
    destinationAccountId: number;
    value: number;
    date: Date;
    cashback?: number;
}