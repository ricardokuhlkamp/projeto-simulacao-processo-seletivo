export interface IReturnTransictions {
    transictionId?: number;
    accountId: number;
    date: Date;
    value: number;
    cashback?: number;
}