import React, { useState } from "react";
import { Button, Typography, TextField } from "@mui/material";
import { createWallet, getTransactions } from "../services/api";
import { Wallet, Transaction } from "../types";

const WalletDetails: React.FC = () => {
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const handleCreateWallet = async () => {
        const response = await createWallet();
        setWallet(response.data);
        fetchTransactions(response.data.address);
    };

    const fetchTransactions = async (address: string) => {
        const response = await getTransactions(address);
        setTransactions(response.data);
    };

    return (
        <div>
            <Typography variant="h6">Wallet Details</Typography>
            {wallet ? (
                <>
                    <TextField fullWidth disabled value={wallet.address} label="Wallet Address" />
                    <Typography variant="subtitle1">Transactions:</Typography>
                    {transactions.length ? (
                        transactions.map((tx) => (
                            <div key={tx.txId}>
                                <Typography>
                                    {tx.txId} - Amount: {tx.amount} - Status: {tx.status}
                                </Typography>
                            </div>
                        ))
                    ) : (
                        <Typography>No transactions yet.</Typography>
                    )}
                </>
            ) : (
                <Button variant="contained" onClick={handleCreateWallet}>
                    Create Wallet
                </Button>
            )}
        </div>
    );
};

export default WalletDetails;
