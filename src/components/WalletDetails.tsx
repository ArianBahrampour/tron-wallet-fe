import React, { useEffect, useState } from "react";
import { Button, Typography, TextField } from "@mui/material";
import { createWallet, getTransactions, getUser, getWallets } from "../services/api";
import { Wallet, Transaction } from "../types";

const WalletDetails: React.FC = () => {
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [usdtBalance, setUsdtBalance] = useState<string>("");

    const handleCreateWallet = async () => {
        const response = await createWallet();
        setWallet(response.data);
        fetchTransactions(response.data.address);
    };

    const fetchTransactions = async (address: string) => {
        const response = await getTransactions(address);
        setTransactions(response.data);
    };

    useEffect(() => {
        getWallets().then((res) => {
            setWallet(res.data.data[0]);
        });

        getUser().then((res) => {
            setUsdtBalance(res.data.data.usdtBalance);
        });
    }, []);

    return (
        <div>
            <Typography variant="h6" sx={{ my: 2 }}>
                Wallet Details
            </Typography>
            <Typography sx={{ my: 2 }}>USDT Balance: {usdtBalance}</Typography>
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
