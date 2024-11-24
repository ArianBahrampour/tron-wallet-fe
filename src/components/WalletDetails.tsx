import React, { useEffect, useState } from "react";
import { Button, Typography, TextField, Container } from "@mui/material";
import { createWallet, getTransactions, getUser, getWallets } from "../services/api";
import { Wallet, Transaction } from "../types";

const WalletDetails: React.FC = () => {
    const [wallet, setWallet] = useState<Wallet[] | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [usdtBalance, setUsdtBalance] = useState<string>("");

    const handleCreateWallet = async () => {
        const response = await createWallet();
        setWallet((prevWallet) => {
            if (prevWallet) {
                return [...prevWallet, response.data];
            }
            return [response.data];
        });
        fetchTransactions();
    };

    const fetchTransactions = async () => {
        const response = await getTransactions();
        setTransactions(response.data.data);
    };

    useEffect(() => {
        getWallets().then((res) => {
            setWallet(res.data.data);
        });

        getUser().then((res) => {
            setUsdtBalance(res.data.data.usdtBalance);
        });

        getTransactions().then((res) => {
            setTransactions(res.data.data);
        });
    }, []);

    return (
        <div>
            <Typography variant="h6" sx={{ my: 2 }}>
                Wallet Details
            </Typography>
            <Typography sx={{ my: 2 }}>USDT Balance: {usdtBalance}</Typography>
            {wallet && wallet[0].hasSuccessfulTransaction && (
                <Button variant="contained" onClick={handleCreateWallet}>
                    Create Wallet
                </Button>
            )}

            {wallet ? (
                wallet.map((w, index) => (
                    <React.Fragment key={index}>
                        <TextField fullWidth disabled value={w.address} label="Wallet Address" sx={{ my: 2 }} />
                    </React.Fragment>
                ))
            ) : (
                <></>
            )}
            <Typography variant="subtitle1">Transactions:</Typography>
            {transactions.length ? (
                transactions.map((tx) => (
                    <Container key={tx.txId} sx={{ my: 2 }}>
                        <Typography>
                            Transaction ID: {tx.txId} - Amount: {tx.amount} USDT - Status: {tx.status}
                        </Typography>

                        <Typography> From Address: {tx.fromAddress}</Typography>
                        <Typography> To Address: {tx.toAddress}</Typography>
                        <Typography> Created At: {tx.createdAt}</Typography>
                    </Container>
                ))
            ) : (
                <Typography>No transactions yet.</Typography>
            )}
        </div>
    );
};

export default WalletDetails;
