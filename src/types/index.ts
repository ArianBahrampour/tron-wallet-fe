export interface Wallet {
    id: string;
    address: string;
    privateKey: string;
}

export interface Transaction {
    txId: string;
    from: string;
    to: string;
    amount: number;
    status: string;
}
