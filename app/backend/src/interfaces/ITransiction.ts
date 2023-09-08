export interface ITransiction {
    transictionId?: number;
    originAccountId: number;
    destinationAccountId: number;
    value: number;
    date: Date;
    cashback?: number;
}