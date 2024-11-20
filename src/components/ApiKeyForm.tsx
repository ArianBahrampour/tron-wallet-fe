import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { generateApiKey } from "../services/api";

const ApiKeyForm: React.FC = () => {
    const [apiKey, setApiKey] = useState<string>(localStorage.getItem("apiKey") || "");

    const handleGenerate = async () => {
        const response = await generateApiKey();
        const newApiKey = response.data.apiKey;
        localStorage.setItem("apiKey", newApiKey);
        setApiKey(newApiKey);
    };

    return (
        <div>
            <Typography variant="h6">API Key</Typography>
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
