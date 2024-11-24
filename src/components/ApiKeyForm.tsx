import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { generateApiKey } from "../services/api";

const ApiKeyForm: React.FC<{ apiKey: string; setApiKey: React.Dispatch<React.SetStateAction<string>> }> = ({
    setApiKey,
    apiKey,
}) => {
    const handleGenerate = async () => {
        const response = await generateApiKey();
        const newApiKey = response.data?.data?.apiKey;
        localStorage.setItem("apiKey", newApiKey);
        setApiKey(newApiKey);
    };

    return (
        <div>
            <Typography variant="h6" sx={{ my: 2 }}>
                API Key
            </Typography>
            {apiKey ? (
                <TextField fullWidth disabled value={apiKey} label="Your API Key" />
            ) : (
                <Button variant="contained" onClick={handleGenerate}>
                    Generate API Key
                </Button>
            )}
        </div>
    );
};

export default ApiKeyForm;
