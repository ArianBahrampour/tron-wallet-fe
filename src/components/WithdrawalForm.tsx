import React, { useState } from "react";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { withdraw } from "../services/api";

const WithdrawalForm: React.FC = () => {
    const [toAddress, setToAddress] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);

    const handleWithdraw = async () => {
        await withdraw({ toAddress, amount });
        alert("Withdrawal Requested");
    };

    return (
        <Grid2 container sx={{ mt: 5 }}>
            <Typography variant="h6">Request Withdrawal</Typography>

            <TextField
                fullWidth
                label="To Address"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                sx={{ my: 2 }}
            />
            <TextField
                fullWidth
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleWithdraw}>
                Submit
            </Button>
        </Grid2>
    );
};

export default WithdrawalForm;
