export interface Wallet {
    id: string;
    address: string;
    hasSuccessfulTransaction: boolean;
}

export interface Transaction {
    txId: string;
    fromAddress: string;
    toAddress: string;
    amount: number;
    status: string;
    createdAt: string;
}
